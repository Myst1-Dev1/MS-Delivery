import { api } from "../axios";


export async function FetchRestaurants() {
    try {
      const res = await api.get("/restaurant");
      
      return res.data;
    } catch (error) {
        console.log("Erro ao dar fetch nos restaurantes.",error);
        return null;
    }
}