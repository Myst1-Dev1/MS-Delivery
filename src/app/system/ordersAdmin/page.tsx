'use server';

import { OrderAdminContent } from "@/components/system/OrderAdminContent";
import { FetchRestaurants } from "@/services/fetchData/fetchRestaurants";

export default async function OrdersAdmin() {
    const restaurant = await FetchRestaurants();

    return (
        <>
            <OrderAdminContent restaurant = {restaurant} />
        </>
    )
}