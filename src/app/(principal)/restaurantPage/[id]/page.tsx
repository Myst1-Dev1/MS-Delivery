'use server'

import { Cart } from "@/components/principal/Header/Cart";
import { RestaurantPageContent } from "@/components/principal/RestaurantPageContent";
import { FetchSingleRestaurant } from "@/services/fetchData/fetchSingleRestaurant";

export default async function RestaurantPage({ params }:any) {
    const { id } = await params;

    const restaurantDetails = await FetchSingleRestaurant(id);
    
    return (
        <>
            <RestaurantPageContent restaurantDetails = { restaurantDetails } />
            <Cart id={id} />
        </>
    )
}