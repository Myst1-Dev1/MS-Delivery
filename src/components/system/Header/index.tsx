'use client';

import { useTheme } from "@/hooks/useTheme";
import { Orders } from "@/types/restaurantDetails";
import { useRef, useState } from "react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

export function Header() {
    const { theme, toggleTheme } = useTheme();
    const [haveOrder, setHaveOrder] = useState(false);
    const [newOrderData, setNewOrderData] = useState<[] | any>([]);

    const socket = useRef<null | any>(null); // 👈 importante

    useEffect(() => {
        socket.current = io("http://localhost:8800"); // ajuste se estiver em prod

        socket.current.on("connect", () => {
            console.log("Conectado ao servidor de pedidos!");
        });

        socket.current.on("new-order", (data:any) => {
            console.log("Novo pedido recebido:", data);
            setNewOrderData((prev:any) => [...prev, data]);

            toast.info("Você recebeu um novo pedido!")
        });

        return () => {
            socket.current?.disconnect(); // 👈 limpa a conexão
        };
    }, []);

    return (
        <>
            <div className="flex justify-end items-end py-4 border-b border-gray-300 w-full">
                <div className="px-5 flex items-center gap-5">
                    <button onClick={toggleTheme} className="text-xl transition-all duration-500 hover:text-orange-500">
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="relative">
                        <FaBell onClick={() => setHaveOrder(!haveOrder)} className="text-xl transition-all duration-500 cursor-pointer hover:text-orange-500" />
                        {newOrderData?.length === 0 ? '' : <span className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full">{newOrderData?.length}</span>}
                    </div>
                    {/* <Image className="w-9 h-9 rounded-full aspect-square object-cover" src="/images/user-icon.png" width={100} height={100} alt="foto do restaurante" /> */}
                </div>
            </div>

            {haveOrder &&
            <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg max-w-80 w-full absolute z-50 top-16 bg-white right-4">
                {newOrderData?.map((order:Orders) => (
                    <div key={order.id} className="flex items-center gap-3">
                        {/* <Image className="w-10 h-10 object-cover rounded-full aspect-square" src="/images/user-icon.png" width={50} height={50} alt="foto do usuário" /> */}
                        <div className="flex gap-1 text-black">
                            <span className="font-bold">Recebeu um pedido de</span>
                            <span className="font-bold">{order.userName}</span>
                        </div>
                    </div>
                 ))}
            </div>
            }
        </>
    )
}