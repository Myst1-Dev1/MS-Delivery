'use server'

import { RestaurantPageContent } from "@/components/principal/RestaurantPageContent";
import { getRestaurantDetails } from "@/services/graphql/graphql";

export default async function RestaurantPage({ params }:any) {
    const { title } = await params;
    const decodedTitle = decodeURIComponent(title);

    const restaurantDetails = await getRestaurantDetails(decodedTitle);
    
    return (
        <>
            <RestaurantPageContent restaurantDetails = { restaurantDetails } />
        </>
    )
}