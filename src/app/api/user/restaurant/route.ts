import { gql, GraphQLClient } from "graphql-request";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export async function POST(req:NextRequest , res:NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { title, address, about, type, foodTypes, bannerUrl } = await req.json();

  if (!title || !address || !about || !type || !foodTypes || !bannerUrl) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }
  
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphCMSToken}`,
    },
  });

  const query = gql`
    mutation createRestaurant(
      $title: String!
      $address: String!
      $about: String!
      $type: String!
      $foodTypes: String!
      $bannerUrl: String!
    ) {
      createRestaurant(
        data: {
          title: $title
          address: $address
          about: $about
          type: $type
          foodTypes: $foodTypes
          banner: { create: { uploadUrl: $bannerUrl } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result:any = await graphQLClient.request(query, {
      title,
      address,
      about,
      type,
      foodTypes,
      bannerUrl,
    });

    return NextResponse.json({
      message: "Restaurante criado com sucesso.",
      restaurantId: result.createRestaurant.id,
    }, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar restaurante:", error);
    return NextResponse.json({ message: "Erro interno no servidor." });
  }
}