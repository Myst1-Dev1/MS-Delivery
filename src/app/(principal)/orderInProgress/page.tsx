'use server';

import { OrderInProgressContent } from "@/components/principal/OrderInProgressContent";
import { cookies } from "next/headers";

export default async function OrderInProgress() {
    const cookie = await cookies();
    const user:any = cookie.get('user-token');

    const userData = JSON.parse(user?.value);
    console.log(userData.zipCode);

    return (
        <>
            <OrderInProgressContent data={userData} />
        </>
    )
}