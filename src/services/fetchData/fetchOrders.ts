import { api } from "../axios";

export async function FetchOrders(id:string) {
    try {
      const res = await api.get("/orders/" + id);
      
      return res.data;
    } catch (error) {
        console.log("Erro ao dar fetch nos restaurantes.",error);
    }
}