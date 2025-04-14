'use client';

import { useChat } from "@/hooks/useChat";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa6";
import { useUser } from "@/hooks/useUser";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

type ChatProps = {
  orderId: string;
  restaurantId: string;
  closeChat:boolean | null | any;
};

export function Chat({ orderId, restaurantId, closeChat }: ChatProps) {
  const { user } = useUser();
  const { restaurant } = useRestaurant();
  const isRestaurant = user.isAdmin;

  const { messages, newMessage, setNewMessage, sendMessage , loadingMessage } = useChat(
    orderId,
    isRestaurant ? "restaurante" : "cliente"
  );

  const data = restaurant?.filter((rest: any) => rest.id.includes(restaurantId));
  const rest = data?.[0];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ⬇️ Rola para o final sempre que mensagens mudam
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed min-h-screen lg:min-h-[466px] lg:max-w-md w-full rounded-md bottom-0 right-0 lg:bottom-10 lg:right-6 bg-white border border-gray-300 z-[9999]">
      {rest && (
        <div className="bg-gray-200 p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={rest.logo} className="w-10 h-10 object-cover rounded-full" width={200} height={200} alt="logo do restaurante" />
            <h6 className="font-bold">{rest.name}</h6>
          </div>
          <div onClick={() => closeChat(null)} className="cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white grid place-items-center bg-gray-100 w-10 h-10 rounded-full aspect-square">
            <FaTimes />
          </div>
        </div>
      )}

      <div className="flex justify-between h-[90vh] lg:h-fit flex-col gap-3 mt-5">
        <div
          ref={messagesEndRef}
          className="transition-all duration-500 h-fit scrollDontShow lg:h-[300px] overflow-y-scroll flex flex-col gap-3 px-3"
        >
          {messages?.map((msg, i) => {
            const isMyMessage = isRestaurant ? msg.sender === "restaurante" : msg.sender === "cliente";
            const timeOnly = new Date(msg.timestamp).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div key={i} className={`flex items-center gap-3 ${isMyMessage ? 'justify-start' : 'justify-end'}`}>
                {!isMyMessage && (
                  <Image
                    src={isRestaurant ? "/images/user-icon.png" : rest.logo}
                    className="w-10 h-10 object-cover rounded-full"
                    width={40}
                    height={40}
                    alt="remetente"
                  />
                )}
                <div className="grid grid-cols-1 gap-1 max-w-[70%]">
                  <p className="text-sm bg-gray-100 p-2 rounded-md">
                    {msg.message}
                  </p>
                  <span className="text-xs font-thin">{timeOnly}</span>
                </div>
                {isMyMessage && (
                  <Image
                    src={isRestaurant ? rest.logo : "/images/user-icon.png"}
                    className="w-10 h-10 object-cover rounded-full"
                    width={40}
                    height={40}
                    alt="remetente"
                  />
                )}
              </div>
            );
          })}
          {loadingMessage && (
            <div className="text-xs text-gray-500 italic text-center py-2">Enviando mensagem...</div>
          )}
        </div>

        <div className="flex items-center h-16 justify-between border-t border-gray-300">
          <input
            type="text"
            className="px-3 w-full outline-none h-full"
            placeholder="Envie uma mensagem"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <FaPaperPlane className="mr-3 cursor-pointer" onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
}