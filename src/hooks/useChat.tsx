import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8800"); // troque pela URL da sua API se for produção

type Message = {
  sender: string;
  message: string;
  timestamp: string;
};

export function useChat(orderId: string, userName: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!orderId) return;

    socket.emit("join_room", orderId);

    const handleReceive = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [orderId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const msg: Message = {
      sender: userName,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit("send_message", {
      orderId,
      ...msg
    });

    setNewMessage(""); // limpa o campo sem adicionar no state diretamente
  };

  return { messages, newMessage, setNewMessage, sendMessage };
}