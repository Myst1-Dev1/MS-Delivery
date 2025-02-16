import { gql, GraphQLClient } from "graphql-request";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const graphqlAPI: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { title, address, about, type, foodTypes, bannerUrl, userId } = await req.json();

  if (!title || !address || !about || !type || !foodTypes || !bannerUrl || !userId) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphCMSToken}`,
    },
  });

  try {
    const bannerResult: any = await graphQLClient.request(
      gql`
        mutation createBanner($bannerUrl: String!) {
          createAsset(data: { uploadUrl: $bannerUrl }) {
            id
          }
        }
      `,
      { bannerUrl }
    );

    const bannerId = bannerResult.createAsset.id;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const restaurantResult: any = await graphQLClient.request(
      gql`
        mutation createRestaurant(
          $title: String!
          $address: String!
          $about: String!
          $type: String!
          $foodTypes: Json!
          $bannerId: ID!
          $userId: String!
        ) {
          createRestaurant(
            data: {
              title: $title
              address: $address
              about: $about
              type: $type
              foodTypes: $foodTypes
              banner: { connect: { id: $bannerId } }
              userId: $userId
            }
          ) {
            id
            banner {
              id
            }
          }
        }
      `,
      { title, address, about, type, foodTypes, bannerId, userId }
    );

    const restaurantId = restaurantResult.createRestaurant.id;

    await graphQLClient.request(
      gql`
        mutation publishBanner($bannerId: ID!) {
          publishAsset(to: PUBLISHED, where: { id: $bannerId }) {
            id
          }
        }
      `,
      { bannerId }
    );

  await new Promise((resolve) => setTimeout(resolve, 3000));

  await graphQLClient.request(
    gql`
      mutation publishRestaurant($id: ID!) {
        publishRestaurant(to: PUBLISHED, where: { id: $id }) {
          id
          banner {
            id
          }
        }
      }
    `,
    { id: restaurantId }
  );

    return NextResponse.json(
      {
        message: "Restaurante criado com sucesso.",
        restaurantId,
        bannerId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao criar restaurante:", error);
    return NextResponse.json({ message: `erro interno no servidor: ${error}` }, { status: 500 });
  }
}