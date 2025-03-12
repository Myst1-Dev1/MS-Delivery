import CreateRestaurantContent from "@/components/createRestaurantContent";
import { cookies } from "next/headers";

export default async function Home() {
    const cookie = await cookies();
    const token = cookie.get('token');

    return (
        <>
            <CreateRestaurantContent token={token?.value} />
        </>
    )
}