'use client';

import { useRestaurant } from "@/hooks/useRestaurant";
import { useUser } from "@/hooks/useUser";
import { Orders } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface OrdersDataProps {
    order:Orders[]
}

export function OrdersData({ order }:OrdersDataProps) {
    const { user } = useUser();
    const { restaurant } = useRestaurant();

    const data = order?.filter(order => order.userId === user?.id);
    
    const pedidoIds = order?.map(o => o.restaurantId);
    const uniquePedidoIds = [...new Set(pedidoIds)];

    const restData = restaurant?.filter((rest:any) =>
    uniquePedidoIds.includes(rest.id)
    );

    return (
        <>
            <div className="py-6 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5">
                {data?.map(order => (
                <div key={order.id} className="m-auto mt-3 flex flex-col gap-5 border border-gray-300 rounded-md max-w-80 w-full p-3">
                    <span className="font-thin text-gray-600">
                    Pedido feito em {new Date(order.createdAt).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}
                    </span>
                    {restData.map((rest:any) => (
                    <div key={rest.id} className="flex justify-between items-center">
                        <Image className="w-10 h-10 rounded-full object-cover" src={rest.logo || "/images/cheddar-burguer.jpg"} width={200} height={200} alt="logo do restaurante" />
                        <h5 className="font-bold">{rest.name || 'Big Bang Burguer'}</h5>
                    </div>
                    ))}
                    <div className="flex items-center gap-3">
                        <Image src={order.orderProductsImage[0] || "/images/cheddar-burguer.jpg"} className="w-16 h-16 rounded-md object-cover" width={200} height={200} alt="foto do produto feito no pedido" />
                        <div className="flex flex-col gap-2">
                            <h5>{order.orderProductsName}</h5>
                            {/* <h6>{order.}</h6> */}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <h6>Pedido aceito</h6>
                    </div>
                    <div className="flex justify-between">
                        <h6>Total</h6>
                        <h6>{FormatPrice(order.orderValue)}</h6>
                    </div>
                </div>
                ))}
            </div>
        </>
    )
}