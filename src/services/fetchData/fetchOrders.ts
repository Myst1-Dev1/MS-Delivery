import { api } from "../axios";

export async function FetchOrders(id: string) {
  try {
    if(!id) return console.log('ID is required');

    const res = await api.get("/orders/" + id);

    if (res.status !== 200 && res.status !== 201) {
      console.error(`Erro: Status de resposta inválido (${res.status})`);
      throw new Error("Pedidos não encontrados ou erro na resposta");
    }

    return res.data || [];
  } catch (error) {
    console.error("Erro ao dar fetch nos pedidos.", error);
    throw new Error("Falha ao buscar os pedidos.");
  }
}