import { api } from "../axios";

export async function FetchSingleRestaurant(id:string) {
  try {
      const res = await fetch(`https://ms-delivery-api.onrender.com/api/restaurant/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          next: { revalidate: 5, tags: ['orders'] }
      });
      
      if (!res.ok) {
          throw new Error(`Erro ao buscar restaurante: ${res.statusText}`);
      }
      
      return await res.json();
  } catch (error) {
      console.log("Erro ao dar fetch nos restaurantes.", error);
  }
}