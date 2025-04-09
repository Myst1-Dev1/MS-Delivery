'use server';

import { RestaurantAdminContent } from "@/components/system/RestaurantAdminContent";
import { fetchRestaurantByUserId } from "@/services/fetchData/fetchRestaurantByUserId";
import { cookies } from "next/headers";

export default async function RestaurantAdmin() {
    const cookie = await cookies();
    const id:any = cookie.get('user-token')

    const token = cookie.get('token')

    const user = JSON.parse(id?.value);
    const getAdminDetails = await fetchRestaurantByUserId(user.id);

    console.log(getAdminDetails);

    return (
        <>
            <RestaurantAdminContent getAdminDetails = {getAdminDetails} token = {token} />
        </>
    )
}