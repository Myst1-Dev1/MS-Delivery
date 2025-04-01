'use client';

import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useState } from "react";
import { FaMapLocation, FaPix } from "react-icons/fa6";
import { QrCode } from "./QrCode";
import { Card } from "./Card";
import { Money } from "./Money";
import { useUser } from "@/hooks/useUser";
import { useOrders } from "@/hooks/useOrders";
import { usePathname } from "next/navigation";
import { FaRocketchat } from "react-icons/fa";
import { Map } from "../Map";
import { Orders } from "@/types/restaurantDetails";
import { handleCreateOrder, handleUpdateOrder } from "@/app/actions/OrderActions";

interface CheckoutContentProps {
    orders:Orders[];
    data:any;
}

export function CheckoutContent({ orders, data }:CheckoutContentProps) {
    const [paymentValue, setPaymentValue] = useState('');

    const { cart, totalCart } = useCart();
    const { user } = useUser();
    const { order } = useOrders();

    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    const id = pathSegments[2];

    const restaurantInCart = cart.find((cartItem) => cartItem.restaurantId === id);
    const restaurantId:any = restaurantInCart ? restaurantInCart.restaurantId : null;

    const pedidosDoUsuario = order
  ?.filter((pedido:any) => pedido.userId === user?.id)
  ?.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const pedidoMaisRecente = pedidosDoUsuario?.[0];

    console.log('pedidos', order);

    return (
        <>
            <div className="mt-10 py-6 px-4 lg:px-10 mb-10 max-w-xl w-full m-auto border-0 lg:border border-gray-300 rounded-md">
                <div>
                    <h2 className="text-center text-3xl font-bold">Seu Pedido</h2>
                        {/* <Image className="w-12 h-12 object-cover" src='/images/pizza.webp' width={100} height={100} alt="logo do restaurante"/> */}
                    <div className="mt-5 flex flex-col gap-5 justify-start items-start m-auto">
                    {cart.map(item => (
                        <div key={item.product.id} className="w-full">
                            <div className="flex items-center gap-3">
                                <Image className="rounded-md w-20 h-20 object-cover" src={item.product.image} width={100} height={100} alt="foto do pedido" />
                                <div className="flex flex-col gap-2">
                                    <h6>{item.product.name}</h6>
                                    <h5 className="font-bold">{FormatPrice(item.product.price)} x {item.quantity}</h5>
                                </div>
                            </div>
                            <p className="mt-3 text-center text-gray-500">{item.observation}</p>
                        </div>
                        ))}            
                    </div>
                    <div className="mt-5">
                        <h5 className="text-xl font-bold">Endereço de entrega</h5>
                        <div className="mt-3 flex items-center gap-3">
                            <FaMapLocation />
                            <p className="text-gray-500">{user?.address} - {user?.zipCode}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h5 className="text-xl font-bold">Forma de pagamento</h5>
                        <div className="relative w-full max-w-80 mt-3">
                            <select value={paymentValue} onChange={(e) => setPaymentValue(e.target.value)} className="border-0 bg-gray-100 p-4 h-[54px] rounded-md w-full outline-none appearance-none">
                                <option value="">Selecione um metodo de pagamento</option>
                                <option value="Pix">PIX</option>
                                <option value="Cartão">Cartão</option>
                                <option value="Dinheiro">Dinheiro</option>
                            </select>
                            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-5 h-5 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => handleCreateOrder( cart, restaurantId, user, totalCart )}
                        className="button max-w-60 w-full text-center mt-5">Finalizar Pedido</button>
                    </div>
                    
                    <button className="button" onClick={() => handleUpdateOrder( pedidoMaisRecente.id, 'Accepted' )}>Aceitar</button>
                  
                </div>
                <div>
                    {paymentValue === 'Pix' && <QrCode setPaymentValue = {setPaymentValue} />}
                    {paymentValue === 'Cartão' && <Card setPaymentValue = {setPaymentValue} />}
                    {paymentValue === 'Dinheiro' && <Money setPaymentValue = {setPaymentValue} />}
                </div>
            </div>

            <div className="w-full flex flex-col gap-5 mt-10 py-6 px-4 lg:px-10 mb-10 max-w-xl m-auto border-0 lg:border border-gray-300 rounded-md justify-center items-center">
                    <h1 className="text-xl font-bold">Acompanhe seu pedido</h1>
                    <div className="max-w-md mb-24 w-full h-48 rounded-md">
                        <Map zipCode={data} />
                    </div>
                    <div className="px-6 lg:px-0 max-w-md flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            {!pedidoMaisRecente ? (
                                ''
                            ) : (
                                <>
                                <span
                                    className={`animate-ping ${
                                    pedidoMaisRecente.status === 'Pending'
                                        ? 'bg-yellow-400'
                                        : pedidoMaisRecente.status === 'Recused'
                                        ? 'bg-red-600'
                                        : pedidoMaisRecente.status === 'Accepted'
                                        ? 'bg-green-500'
                                        : 'bg-gray-400'
                                    } w-5 h-5 rounded-full`}
                                ></span>
                                <h6 className="font-bold">
                                    {pedidoMaisRecente.status === 'Pending'
                                    ? 'Aguardando confirmação do restaurante'
                                    : pedidoMaisRecente.status === 'Accepted'
                                    ? 'Pedido aprovado! Está a caminho!'
                                    : 'Pedido recusado 😔'}
                                </h6>
                                </>
                            )}
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
                                ${order?.length > 0 && (() => {
                                    const latestOrder = [...order].sort((a:any, b:any) => 
                                        new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                                    )[0];

                                    return (
                                        latestOrder?.status === 'Pending' || latestOrder?.status === 'Recused'
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'opacity-100 cursor-pointer'
                                    );
                                })()}
                            `}
                            disabled={order?.length > 0 && (() => {
                                const latestOrder = [...order].sort((a:any, b:any) => 
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