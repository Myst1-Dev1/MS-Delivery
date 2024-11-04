import { request, gql } from 'graphql-request';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

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
                }
                id
                foodTypes
            }
            }
    `

    const results:any = await request(graphqlAPI, query, { title });
    return results.restaurants;
}