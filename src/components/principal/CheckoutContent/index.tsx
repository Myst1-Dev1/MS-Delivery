'use client';

import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useState } from "react";
import { FaMapLocation } from "react-icons/fa6";
import { QrCode } from "./QrCode";
import { Card } from "./Card";
import { Money } from "./Money";
import { useSession } from "next-auth/react";

export function CheckoutContent() {
    const [paymentValue, setPaymentValue] = useState('');
    const { data:session } = useSession();

    const { cart } = useCart();

    return (
        <>
            <div className="mt-10 py-6 px-4 lg:px-10 mb-10 max-w-xl w-full m-auto border-0 lg:border border-gray-300 rounded-md">
            {paymentValue === '' ? <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-center text-3xl font-bold">Seu Pedido</h2>
                        <Image className="w-12 h-12 object-cover" src='/images/pizza.webp' width={100} height={100} alt="logo do restaurante"/>
                    </div>
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
                            <p className="text-gray-500">{session?.user.address} - {session?.user.zipCode}</p>
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
                    {/* <div className="flex justify-center">
                        <button className="mt-5 font-bold p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Ir para o pagamento</button>
                    </div> */}
                </div>
                    : 
                <div>
                    {paymentValue === 'Pix' && <QrCode setPaymentValue = {setPaymentValue} />}
                    {paymentValue === 'Cartão' && <Card setPaymentValue = {setPaymentValue} />}
                    {paymentValue === 'Dinheiro' && <Money setPaymentValue = {setPaymentValue} />}
                    
                </div>
             }
            </div>
        </>
    )
}