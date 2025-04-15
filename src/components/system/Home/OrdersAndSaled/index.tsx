'use client';

import { useOrders } from "@/hooks/useOrders";
import { useTheme } from "@/hooks/useTheme";
import { Orders } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";

export function OrdersAndSaled() {
    const { order } = useOrders();
    const { theme } = useTheme();

    const data = order?.filter((pedido:any) => pedido.status === 'Completed');

    return (
        <>
             <div className="py-10 grid grid-cols-1 lg:grid-cols-3 flex-col lg:flex-row">
                <div className="lg:col-span-2 px-5 lg:px-0">
                    <h2 className="text-xl font-bold mb-5">Últimos pedidos</h2>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
                            <thead className={`transition-all duration-500 ${theme === 'dark' ? 'bg-[#303030]' : 'bg-gray-100'} border-b border-gray-300`}>
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Usuário</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Endereço</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Adicionais</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Cep</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Valor do pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                {!data || data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-2 text-center text-sm text-gray-300">
                                            Você não possui pedidos
                                        </td>
                                    </tr>
                                ) : (
                                    data?.slice(-4).map((order: Orders, index: number) => (
                                        <tr key={index} className="border-b hover:brightness-90">
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.userName}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.address}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>
                                                <div className="flex flex-col gap-1">
                                                    {order.orderProductsName.map((item, idx) => (
                                                        <span key={idx}>{item}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>
                                                <div className="flex flex-col gap-1">
                                                    {order.orderProductsObservation.length === 0 ? '' : order.orderProductsObservation.map((item, idx) => (
                                                        <span key={idx}>{item}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{order.zipCode}</td>
                                            <td className={`px-4 py-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700 transition-all duration-500'}`}>{FormatPrice(order.orderValue)}</td>
                                            <td className="px-4 py-2 text-center align-middle">{order.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="px-5 lg:mt-0 mt-5">
                    <h2 className="text-xl font-bold">Mais vendidos</h2>
                    <div className="mt-7 overflow-y-scroll h-60 scrollDontShow">
                        {data?.slice(-4)?.map((order:Orders) => (
                            <div key={order.id} className="flex gap-3 items-center border-b border-gray-300 pb-2">
                                <Image className="w-20 h-20 object-cover" src={order?.orderProductsImage?.[0] ?? "/images/cheddar-burguer.jpg"}  width={200} height={200} alt="imagem do produto" />
                                <div className="flex flex-col gap-3">
                                    <h5 className="font-bold">{order.orderProductsName[0]}</h5>
                                    <h5 className="font-bold">{FormatPrice(order.orderValue)}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}