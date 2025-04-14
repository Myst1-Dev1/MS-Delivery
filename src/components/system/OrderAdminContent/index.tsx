'use client';

import { Orders, Restaurant } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import { FaCheck, FaRocketchat, FaTimes } from "react-icons/fa";
import { Header } from "../Header";
import { useTheme } from "@/hooks/useTheme";
import { useOrders } from "@/hooks/useOrders";
import { handleUpdateOrder } from "@/app/actions/OrderActions";
import { Chat } from "@/components/principal/CheckoutContent/Chat";
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";

interface OrderAdminContentProps {
    restaurant:Restaurant
}

export function OrderAdminContent({ restaurant }:OrderAdminContentProps) {
    const [chat, setChat] = useState<string | null | any>('');
    
    const { theme } = useTheme();
    const { order, id } = useOrders();

    const pedidosIds = order?.map((p:any) => p.id) || [];

    const { notifiedOrders, clearNotification } = useNotifications(pedidosIds);

    console.log(order);

    return (
        <>
         <div className={`flex-1 min-h-screen ${theme === 'dark' ? 'bg-[#202020] text-white' : ''}`}>
            <Header />
                <div className="px-5 mt-5">
                    <h2 className="font-bold text-xl mb-5">Pedidos</h2>
                    <div className="max-w-xl lg:max-w-full overflow-x-auto">
                        <table className="mb-4 min-w-full border-collapse border border-gray-300 shadow-md">
                            <thead className={`transition-all duration-500 ${theme === 'dark' ? 'bg-[#303030]' : 'bg-gray-100'} border-b border-gray-300`}>
                                <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Usuário</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Endereço</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Informações adicionais</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Cep</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Valor do pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Chat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!order || order.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className={`px-4 py-2 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                                            Você não possui pedidos
                                        </td>
                                    </tr>
                                ) : (
                                    order?.map((order: Orders, index: number) => (
                                        <tr key={index} className="border-b hover:brightness-90">
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.userName}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.address}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>
                                                {order.orderProductsName.map((item, idx) => (
                                                    <span key={idx}>{item}</span>
                                                ))}
                                            </td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>
                                                {order.orderProductsObservation.length === 0 ? '' : order.orderProductsObservation.map((item, idx) => (
                                                    <span key={idx}>{item}</span>
                                                ))}
                                            </td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.zipCode}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{FormatPrice(order.orderValue)}</td>
                                            <td className="px-4 py-2 align-middle gap-2">
                                                {order.status !== 'Pending' ? (
                                                    <div>
                                                        {order.status === 'Accepted' && (
                                                        <span className="flex items-center gap-3">
                                                            Pedido Aceito <FaCheck className="text-green-500" />
                                                        </span>
                                                        )}

                                                        {order.status === 'Completed' && (
                                                        <span className="flex items-center gap-3">
                                                            Pedido Concluído <FaCheck className="text-blue-500" />
                                                        </span>
                                                        )}

                                                        {order.status === 'Recused' && (
                                                        <span className="flex items-center gap-3">
                                                            Pedido Recusado <FaTimes className="text-red-600" />
                                                        </span>
                                                        )}
                                                    </div>
                                                    ) : (
                                                    <>
                                                        <div
                                                        onClick={() => handleUpdateOrder(order.id, 'Accepted')}
                                                        className="mb-3 text-center cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-green-500 text-white rounded-xl"
                                                        >
                                                        <FaCheck className="flex-shrink-0 text-xs" />
                                                        <span>Aceitar</span>
                                                        </div>
                                                        <div
                                                        onClick={() => handleUpdateOrder(order.id, 'Recused')}
                                                        className="text-center cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-red-600 text-white rounded-xl"
                                                        >
                                                        <FaTimes className="flex-shrink-0 text-xs" />
                                                        <span>Recusar</span>
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-sm relative">
                                                <FaRocketchat
                                                    onClick={() => {
                                                    setChat(order.id);
                                                    clearNotification(order.id);
                                                    }}
                                                    className={`text-xl ${order.status === 'Completed' || order.status === 'Recused' ? 'cursor-not-allowed opacity-60' : 'opacity-100 cursor-pointer'}`}
                                                />

                                                {notifiedOrders.includes(order.id) && (
                                                    <span className="absolute top-2 right-4 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                    !
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {chat && <Chat orderId={chat} restaurantId={id} closeChat={setChat} />}
        </>
    )
}