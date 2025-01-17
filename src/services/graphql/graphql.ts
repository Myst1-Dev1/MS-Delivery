import { request, gql, GraphQLClient } from 'graphql-request';
import { api } from '../axios';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN;

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

const CREATE_PRODUCT = gql`
  mutation createRestaurant($categoryTitle: String!, $name: String!, $price: Float!, $uploadImg: String!, $userId: String!, $description: String!) {
  createRestaurant(
    data: {categorie: {create: {categoryTitle: $categoryTitle, name: $name, price: $price, image: {create: {uploadUrl: $uploadImg}}, restaurant: {connect: {userId: $userId}}, description: $description}}}
  ) {
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

export async function createNewProduct(categoryTitle:string, name:string, price:number, uploadImg:string, userId:string, description:string) {
  try {
    const response = await graphQLClient.request(CREATE_PRODUCT, {
      categoryTitle, name, price, uploadImg, userId, description
    })

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
        restaurant(where: { userId: "677ec336ae29166373b2758b" }) {
          foodTypes
        }
      }
    `);

    const existingCategories =
      existingData?.restaurant?.foodTypes && Array.isArray(existingData.restaurant.foodTypes)
        ? existingData.restaurant.foodTypes
        : [];

    const updatedCategories = [
      ...existingCategories,
      { type }
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
          where: { userId: "677ec336ae29166373b2758b" }
        ) {
          title
          address
          about
          foodTypes
        }
        publishRestaurant(where: {userId: "677ec336ae29166373b2758b"}) {
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