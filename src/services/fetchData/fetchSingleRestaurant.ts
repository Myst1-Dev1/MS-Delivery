import { api } from "../axios";

export async function FetchSingleRestaurant(id:string) {
    try {
      const res = await api.get("/restaurant/" + id);
      
      return res.data;
    } catch (error) {
        console.log("Erro ao dar fetch nos restaurantes.",error);
    }
}