'user server';

import { Header } from "@/components/system/Header";
import { FetchOrders } from "@/services/fetchData/fetchOrders";
import { Orders } from "@/types/restaurantDetails";
import { FaCheck, FaTimes } from "react-icons/fa";

export default async function OrdersAdmin() {
    const id = "67d494cfb882ae0b953823d2";
    const orders = await FetchOrders(id);

    return (
        <>
            <div className="flex-1">
                <Header />

                <div className="px-5 mt-5">
                    <h2 className="font-bold text-xl mb-5">Pedidos</h2>
                    <div className="max-w-xl lg:max-w-full overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
                            <thead className="bg-gray-100 border-b border-gray-300">
                                <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Usuário</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Endereço</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Informações adicionais</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cep</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Valor do pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!orders || orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-2 text-center text-sm text-gray-800">
                                            Você não possui pedidos
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order: Orders, index: number) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.userName}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.address}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">
                                                {order.orderItems.map((item, idx) => (
                                                    <span key={idx}>{item}</span>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.additionalInformations}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.zipCode}</td>
                                            <td className="px-4 py-2 text-sm text-gray-800">{order.orderValue}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <div className="cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-green-500 text-white rounded-xl">
                                                    <FaCheck className="flex-shrink-0 text-xs" />
                                                    <span>Aceitar</span>
                                                </div>
                                                <div className="cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-red-600 text-white rounded-xl">
                                                    <FaTimes className="flex-shrink-0 text-xs" />
                                                    <span>Recusar</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}