'user server';

import { api } from "@/services/axios";

export async function handleAvaliation(id:string, stars:number, comment:string, userId:string) {
    try {
        const res = await api.post("/restaurant/avaliation/" + id, { stars, comment, restaurantId: id, userId });

        console.log('Avaliação feita com sucesso.', res.data);
    } catch (error) {
        console.log(error);
    }
}