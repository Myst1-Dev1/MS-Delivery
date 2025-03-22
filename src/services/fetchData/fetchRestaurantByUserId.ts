import { api } from "../axios";

export async function fetchRestaurantByUserId(id:string) {
    try {
        const res = await api.get("/restaurant/userRestaurant/" + id);

        return res.data
    } catch (error) {
        console.log('Falha ao buscar dados do restaurante do usuário', error);
        return null;
    }
}