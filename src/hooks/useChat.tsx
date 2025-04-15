import { api } from "@/services/axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://ms-delivery-api.onrender.com");

type Message = {
  sender: string;
  message: string;
  timestamp: string;
};

export function useChat(orderId: string, userName: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);

  useEffect(() => {
    if (!orderId) return;

    // Entra na sala do pedido
    socket.emit("join_room", orderId);

    // Buscar histórico no backend
    const fetchHistory = async () => {
      try {
        const res = await api.get('/chat/' + orderId);
        console.log("Mensagens carregadas:", res.data);
        setMessages(res.data);
      } catch (err) {
        console.error("Erro ao buscar histórico do chat:", err);
      }
    };

    fetchHistory();

    // Recebe mensagens em tempo real
    const handleReceive = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [orderId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    const msg: Message = {
      sender: userName,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };
  
    setLoadingMessage(true);
    setNewMessage("");
  
    socket.emit("send_message", {
      orderId,
      ...msg,
    });
  
    try {
      await Promise.all([
        api.post('/chat/' + orderId, msg),
        new Promise((res) => setTimeout(res, 1000)),
      ]);
    } catch (err) {
      console.error("Erro ao salvar mensagem:", err);
    } finally {
      setLoadingMessage(false);
    }
  };  

  return { messages, newMessage, setNewMessage, sendMessage, loadingMessage };
}