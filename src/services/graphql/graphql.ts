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