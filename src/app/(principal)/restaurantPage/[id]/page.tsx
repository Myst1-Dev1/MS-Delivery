'use server'

import { RestaurantPageContent } from "@/components/principal/RestaurantPageContent";
import { FetchSingleRestaurant } from "@/services/fetchData/fetchSingleRestaurant";

export default async function RestaurantPage({ params }:any) {
    const { id } = await params;

    const restaurantDetails = await FetchSingleRestaurant(id);

    console.log(restaurantDetails);
    
    return (
        <>
            <RestaurantPageContent restaurantDetails = { restaurantDetails } />
        </>
    )
}