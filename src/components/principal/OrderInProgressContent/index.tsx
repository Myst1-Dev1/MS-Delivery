'use client';

import { useCart } from "@/hooks/useCart";
import { Map } from "../Map";
import { FormatPrice } from "@/utils/formatPrice";
import { FaPix } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa";
import { useOrders } from "@/hooks/useOrders";
import { usePathname } from "next/navigation";

interface OrderInProgressContentProps {
    data:any;
}

export function OrderInProgressContent({ data }:OrderInProgressContentProps) {
    const { cart, totalCart } = useCart();
    const { order } = useOrders();

    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    const idFromPath = pathSegments[2];

    const dataOrder = order?.data.filter((orderItem: any) => orderItem.restaurantId === idFromPath);

    console.log(dataOrder);
    
        return (
            <>
                <div className="w-full flex flex-col gap-5 py-8 justify-center items-center">
                    <h1 className="text-xl font-bold">Acompanhe seu pedido</h1>
                    <div className="max-w-md mb-24 w-full h-48 rounded-md">
                        <Map zipCode={data} address={dataOrder.address} />
                    </div>
                    <div className="px-6 lg:px-0 max-w-md flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            {order?.data?.length > 0 && (() => {
                                const latestOrder = [...order.data].sort((a, b) => 
                                    new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                                )[0];
                                return (
                                    <span 
                                    className={`animate-ping ${
                                        latestOrder?.status === 'Pending'
                                          ? 'bg-yellow-400'
                                          : latestOrder?.status === 'Recused'
                                          ? 'bg-red-600'
                                          : latestOrder?.status === 'Accepted'
                                          ? 'bg-green-500'
                                          : 'bg-gray-400'
                                      } w-5 h-5 rounded-full`}
                                    ></span>
                                );
                            })()}
                            <h6 className="font-bold">Pedido sendo preparado em breve sairá para entrega</h6>
                        </div>
                        <div>
                            <h6 className="font-bold">Pedido</h6>
                            <div className="flex flex-col gap-2 mt-2">
                               {cart.map(item => (
                                <span key={item.product.id}>{item.quantity} {item.product.name}</span>
                               ))} 
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold">Total</h6>
                            <h6>{FormatPrice(totalCart)}</h6>
                        </div>
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold">Pagamento</h6>
                            <div className="flex items-center gap-3">
                                <FaPix className="text-green-400" />
                                Pix
                            </div>
                        </div>
                        <div className="invisible font-bold gap-3 cursor-pointer flex justify-end items-center">
                            <FaRocketchat />
                            Chat
                        </div>
                        <button 
                            className={`button transition-all duration-500 
                                ${order?.data?.length > 0 && (() => {
                                    const latestOrder = [...order.data].sort((a, b) => 
                                        new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                                    )[0];

                                    return (
                                        latestOrder?.status === 'Pending' || latestOrder?.status === 'Recused'
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'opacity-100 cursor-pointer'
                                    );
                                })()}
                            `}
                            disabled={order?.data?.length > 0 && (() => {
                                const latestOrder = [...order.data].sort((a, b) => 
                                    new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                                )[0];
                                return latestOrder?.status === 'Pending' || latestOrder?.status === 'Recused';
                            })()}
                        >
                            Recebi meu pedido
                        </button>
                    </div>
                </div>
            </>
        )
} 