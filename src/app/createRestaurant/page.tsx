import { CreateRestaurantContent } from "@/components/CreateRestaurantContent";
import { fetchRestaurantByUserId } from "@/services/fetchData/fetchRestaurantByUserId";
import { cookies } from "next/headers";

export default async function CreateRestaurantPage() {
    const cookie = cookies();
    const token = cookie.get('token');

    const id = cookie.get('user-token');
    const value = id ? JSON.parse(id.value) : null;

    const restaurant = await fetchRestaurantByUserId(value?.id);

    return (
        <>
            <CreateRestaurantContent token={token?.value} restaurant = {restaurant} />
        </>
    )
}