import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8800"); // ou seu endpoint real

export function useNotifications(orderIds: string[]) {
  const [notifiedOrders, setNotifiedOrders] = useState<string[]>([]);

  useEffect(() => {
    if (!orderIds || orderIds.length === 0) return;

    // Entra nas salas dos pedidos (1 vez por componente)
    orderIds.forEach((id) => {
      socket.emit("join_room", id);
    });

    // Escuta notificações de nova mensagem
    const handleNotification = (data: { orderId: string }) => {
      const { orderId } = data;

      // Se ainda não notificou, adiciona
      setNotifiedOrders((prev) =>
        prev.includes(orderId) ? prev : [...prev, orderId]
      );
    };

    socket.on("new_notification", handleNotification);

    return () => {
      socket.off("new_notification", handleNotification);
    };
  }, [orderIds]);

  // Função para limpar a notificação (ao abrir o chat)
  const clearNotification = (orderId: string) => {
    setNotifiedOrders((prev) => prev.filter((id) => id !== orderId));
  };

  return {
    notifiedOrders,
    clearNotification,
  };
}