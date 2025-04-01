'use server';

import { CheckoutContent } from "@/components/principal/CheckoutContent";
import { FetchSingleRestaurant } from "@/services/fetchData/fetchSingleRestaurant";
import { cookies } from "next/headers";

export default async function Checkout({ params }:any) {
    const { id } = await params;
    const restaurantDetails = await FetchSingleRestaurant(id);

    const cookie = await cookies();
    const user:any = cookie.get('user-token');

    console.log(restaurantDetails.orders);

    const userData = JSON.parse(user?.value);

    return (
        <>
            <CheckoutContent orders = {restaurantDetails.orders} data = {userData} />
        </>
    )
}