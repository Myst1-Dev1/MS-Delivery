import { request, gql, GraphQLClient } from 'graphql-request';
import { api } from '../axios';
import { parseCookies } from 'nookies';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;
export const { 'user': userId } = parseCookies()

  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphCMSToken}`,
    },
  });

export const getRestaurants = async() => {
    const query = gql`
        query Restaurants {
            restaurants(first: 9999) {
                banner {
                url
                }
                about
                address
                title
                type
                categorie {
                additionals
                categoryTitle
                description
                name
                price
                image {
                    url
                }
                }
                id
                userId
            }
    }
    `

    const results:any = await request(graphqlAPI, query);
    return results.restaurants;
}

export const getRestaurantUserId = async() => {
  const query = gql`
      query Restaurants {
          restaurants(first: 9999) {
              userId
          }
  }
  `

  const results:any = await request(graphqlAPI, query);
  return results.restaurants;
}

export const getRestaurantDetails = async(title:any) => {
    const query = gql`
        query getRestaurantDetails($title: String!) {
            restaurants(where: {title: $title}) {
                banner {
                url
                }
                about
                address
                title
                type
                categorie {
                additionals
                categoryTitle
                description
                name
                price
                image {
                    url
                }
                id
                }
                id
                foodTypes
            }
            }
    `

    const results:any = await request(graphqlAPI, query, { title });
    return results.restaurants;
}

export const getRestaurantAdminDetails = async(userId:any) => {
  const query = gql`
      query getRestaurantDetails($userId: String!) {
          restaurants(where: {userId: $userId}) {
              banner {
              url
              id
              }
              about
              address
              title
              type
              categorie {
              additionals
              categoryTitle
              description
              name
              price
              image {
                  url
                  id
              }
              id
              }
              id
              foodTypes
          }
          }
  `

  const results:any = await request(graphqlAPI, query, { userId });
  return results.restaurants;
}

export const createRestaurant = async(obj:any) => {
    try {
      const response = await api.post('/api/user/restaurant', obj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const UPDATE_RESTAURANT_BANNER = gql`
  mutation UpdateRestaurant($userId: String!, $bannerId: ID!, $uploadUrl: String!) {
    updateRestaurant(
      where: { userId: $userId }
      data: {
        banner: {
          update: {
            where: { id: $bannerId }
            data: { uploadUrl: $uploadUrl, reUpload: true }
          }
        }
      }
    ) {
      banner {
      id
    }
    }
  }
`;

const PUBLISH_ASSET = gql`
  mutation PublishAsset($bannerId: ID!) {
    publishAsset(where: { id: $bannerId }) {
      id
    }
  }
`;

// const CREATE_PRODUCT = gql`
//   mutation createCategorie($categoryTitle: String!, $name: String!, $price: Float!, $uploadImg: String!, $userId: String!, $description: String!) {
//   createCategorie(
//     data: {categorie: {create: {categoryTitle: $categoryTitle, name: $name, price: $price, image: {create: {uploadUrl: $uploadImg}}, restaurant: {connect: {userId: $userId}}, description: $description}}}
//   ) {
//     id
//     image {
//       id
//     }
//   }
// }
// `

const CREATE_PRODUCT = gql`
  mutation createCategorie(
    $categoryTitle: String!, 
    $name: String!, 
    $price: Float!, 
    $uploadImg: String!, 
    $userId: String!, 
    $description: String!
  ) {
    createCategorie(
      data: {
        categoryTitle: $categoryTitle,
        name: $name,
        price: $price,
        image: { create: { uploadUrl: $uploadImg } },
        restaurant: { connect: { userId: $userId } },
        description: $description
      }
    ) {
      id
      image {
        id
      }
    }
  }
`;


const PUBLISH_CATEGORIE = gql`
  mutation PublishCategorie($categorieId: ID!) {
  publishCategorie(to: PUBLISHED, where: {id: $categorieId}) {
    id
  }
}
`

const UPDATE_PRODUCT = gql`
  mutation updateProduct($categoryTitle: String!, $name: String!, $price: Float!, $uploadImg: String!, $imgId: ID!, $productId: ID! $description: String!) {
  updateCategorie(
    data: {categoryTitle: $categoryTitle, name: $name, price: $price , image: {update: {where: {id: $imgId}, data: {uploadUrl: $uploadImg, reUpload: true}}}, description: $description}
    where: {id: $productId}
  ) {
    name
    price
    description
  }
  publishCategorie(where: {id: $productId}) {
    id
  }
}
`
const PUBLISH_NEW_ASSETS = gql`
  mutation publishNewAssets($createdAt: DateTime!) {
    publishManyAssetsConnection(
      to: PUBLISHED,
      where: { createdAt_gte: $createdAt }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation createOrder($nomeDoCliente:String!, $endereco: String!, $informacoesAdicionais: String!, $cep: String!, $valorDoPedido: Float!, $pedido: String!) {
  createOrder(
    data: {nomeDoCliente: $nomeDoCliente, endereco: $endereco, informacoesAdicionais: $informacoesAdicionais, cep: $cep, valorDoPedido: $valorDoPedido, restaurant: {connect: {userId: "677ec336ae29166373b2758b"}}, pedido: $pedido}
  ) {
    cep
  }
}
`

export async function createOrder(
  nomeDoCliente: string | any,
  endereco: string,
  informacoesAdicionais: string,
  cep: string,
  valorDoPedido: number,
  pedido: string
) {
  try {
      const response = await graphQLClient.request(CREATE_ORDER, {
          nomeDoCliente,
          endereco,
          informacoesAdicionais,
          cep,
          valorDoPedido,
          pedido,
      });

      console.log('Pedido criado com sucesso:', response);
  } catch (error) {
      console.log('Erro ao criar pedido:', error);
  }
}

function getCurrentDateWithoutTime(): string {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00Z`;
}

export async function createNewProduct(categoryTitle:string, name:string, price:number, uploadImg:string, userId:string, description:string) {
  try {
    const response:any = await graphQLClient.request(CREATE_PRODUCT, {
      categoryTitle, name, price, uploadImg, userId, description
    })

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const categorieId = response.createCategorie.id;

    if (!categorieId) {
      throw new Error("Erro ao obter IDs da categoria ou da imagem.");
    }

    await graphQLClient.request(PUBLISH_CATEGORIE, { categorieId });
    const currentDate = getCurrentDateWithoutTime();

    await graphQLClient.request(PUBLISH_NEW_ASSETS, {
      createdAt: currentDate,
    });

    console.log('Produto criado com sucesso', response);
  } catch (error) {
    console.log('Erro ao criar produto', error);
  }
}

export async function updateProduct(categoryTitle:string, name:string, price:number, uploadImg:string, imgId:string, productId:string, description:string) {
  try {
    const response = await graphQLClient.request(UPDATE_PRODUCT, {
      categoryTitle, name, price, uploadImg, imgId, productId, description
    })

    console.log('Produto atualizado com sucesso', response);
  } catch (error) {
    console.log('Erro ao atualizado produto', error);
  }
}

export async function updateRestaurantBanner(userId: string, bannerId: string, uploadUrl: string) {
  try {
    const response = await graphQLClient.request(UPDATE_RESTAURANT_BANNER, {
      userId,
      bannerId,
      uploadUrl,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await graphQLClient.request(PUBLISH_ASSET, {
      bannerId
    })
    console.log("Restaurante atualizado com sucesso:", response);
  } catch (error) {
    console.error("Erro ao atualizar o banner do restaurante:", error);
  }
}

export async function handleUpdateRestaurant(
  title: string,
  address:string,
  about: string,
  type: string
) {
  try {
    const existingData: any = await graphQLClient.request(`
      query GetRestaurant {
        restaurant(where: { userId: "${userId}" }) {
          foodTypes
        }
      }
    `);

    const existingCategories =
      existingData?.restaurant?.foodTypes && Array.isArray(existingData.restaurant.foodTypes)
        ? existingData.restaurant.foodTypes
        : [];

    const updatedCategories = [
      ...existingCategories
    ];

    await graphQLClient.request(
      `
      mutation UpdateRestaurant($title: String!, $address: String!, $about: String!, $categories: Json!) {
        updateRestaurant(
          data: {
            title: $title,
            address: $address
            about: $about,
            foodTypes: $categories
          }
          where: { userId: "${userId}" }
        ) {
          title
          address
          about
          foodTypes
        }
        publishRestaurant(where: {userId: "${userId}"}) {
          id
        }
      }
    `,
      {
        title,
        address,
        about,
        categories: updatedCategories,
      }
    );

    console.log("Restaurante atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o restaurante:", error);
  }
}

export async function handleDeleteFoodType(typeToDelete: string) {
  try {
    const existingData: any = await graphQLClient.request(`
      query GetRestaurant {
        restaurant(where: { userId: "${userId}" }) {
          foodTypes
        }
      }
    `);

    const updatedCategories = existingData?.restaurant?.foodTypes?.filter(
      (item: { type: string }) => item.type !== typeToDelete
    ) || [];

    await graphQLClient.request(
      `
      mutation UpdateRestaurant($categories: Json!) {
        updateRestaurant(
          data: { foodTypes: $categories }
          where: { userId: "${userId}" }
        ) {
          foodTypes
        }
        publishRestaurant(where: { userId: "${userId}" }) {
          id
        }
      }
    `,
      { categories: updatedCategories }
    );

    console.log(`Categoria "${typeToDelete}" removida com sucesso!`);
  } catch (error) {
    console.error("Erro ao remover a categoria:", error);
  }
}


export async function handleDeleteProduct(id:string) {
  try {
    await graphQLClient.request(
      `
        mutation deleteProduct($id: ID!) {
          deleteCategorie(where: {id: $id}) {
            id
          }
      }  
      `, {
        id
      }
    );

    console.log('Produto deletado com sucesso');
  } catch (error) {
    console.log('Erro ao deletar o produto', error);
  }
}