'use server';

import { HomeAdminContent } from "@/components/system/HomeAdminContent";
import { fetchRestaurantByUserId } from "@/services/fetchData/fetchRestaurantByUserId";
import { cookies } from "next/headers";

export default async function Home() {
    const cookie = await cookies();
    const id:any = cookie.get('user-token')

    const user = JSON.parse(id?.value);
    const getAdminDetails = await fetchRestaurantByUserId(user.id);

    return (
        <>
            <HomeAdminContent admin={getAdminDetails} />
        </>
    )
}