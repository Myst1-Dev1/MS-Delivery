'use client';

import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { FaMapLocation, FaStar } from "react-icons/fa6";
import { useUser } from "@/hooks/useUser";
import { useOrders } from "@/hooks/useOrders";
import { usePathname, useRouter } from "next/navigation";
import { FaRocketchat, FaTimesCircle } from "react-icons/fa";
import { Map } from "../Map";
import { Orders, Restaurant } from "@/types/restaurantDetails";
import { handleCreateOrder, handleUpdateOrder } from "@/app/actions/OrderActions";
import { handleAvaliation } from "@/app/actions/RestaurantActions";
import { Loading } from "@/components/global/Loading";
import Link from "next/link";
import { toast } from "react-toastify";
import { Chat } from "./Chat";
import { useNotifications } from "@/hooks/useNotifications";

interface CheckoutContentProps {
    orders:Orders[];
    data:any;
    restaurant:Restaurant;
}

export function CheckoutContent({ data, restaurant }:CheckoutContentProps) {
    const [paymentValue, setPaymentValue] = useState('');
    const [orderStatus, setOrderStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avaliation, setAvaliation] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [avalLoading, setAvalLoading] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const { cart, totalCart } = useCart();
    const { user } = useUser();
    const { order } = useOrders();

    const router = useRouter();

    const pathname = usePathname();
    const pathSegments = pathname.split("/");
    const id = pathSegments[2];

    const restaurantInCart = cart.find((cartItem) => cartItem.restaurantId === id);
    const restaurantId:any = restaurantInCart ? restaurantInCart.restaurantId : null;

//     const pedidosDoUsuario = order
//   ?.filter((pedido:any) => pedido.userId === user?.id)
//   ?.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//     const pedidoMaisRecente = pedidosDoUsuario?.[0];

    const pedidosDoUsuario = Array.isArray(order)
        ? order.filter((pedido: any) => pedido.userId === user?.id).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    const pedidoMaisRecente = pedidosDoUsuario.find((pedido: any) => pedido.status === 'Pending') || pedidosDoUsuario[0];

    const { notifiedOrders, clearNotification } = useNotifications([pedidoMaisRecente?.id]);

    async function createOrder() {
        try {
            setLoading(true);
            await handleCreateOrder( cart, restaurantId, user, totalCart );

            setOrderStatus(true);
        } catch (error) {
            console.log(error);
        }finally { 
            setTimeout(() => {
                setLoading(false);
            }, 2000);
         }
    }

    async function handleShowAvaliationForm() {
        setLoading(true);
        try {
            await handleUpdateOrder(pedidoMaisRecente?.id, 'Completed')
            setAvaliation(true);
        } catch (error) {
            console.log(error);
        }finally { 
            setTimeout(() => {
                setLoading(false);
            }, 1000);
         }
    }

    async function createAvaliation(e: FormEvent | any) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const comment = data.get('comment') as string;
      
        if (selectedStars === 0) {
          alert("Por favor, selecione uma quantidade de estrelas.");
          return;
        }
      
        setAvalLoading(true);
        try {
            await handleAvaliation( id, selectedStars, comment, user?.id);

            toast.success('Obrigado pela avaliação 😊 !!!')
            router.push('/restaurants');
        } catch (error) {
            console.log('Tivemos um erro ao fazer a avaliação', error);
        }finally { setAvalLoading(false) }
      }

    return (
        <>
            <div className="mt-10 py-6 px-4 lg:px-10 mb-10 max-w-xl w-full m-auto border-0 lg:border border-gray-300 rounded-md">
                {loading ? 
                    <div data-testid="loading" className="grid place-items-center"><div className="loader-spin"/> </div>
                : orderStatus === false ?
                <div>
                    <h2 className="text-center text-3xl font-bold">Seu Pedido</h2>
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
                        <button onClick={createOrder}
                        className="button max-w-60 w-full text-center mt-5">Finalizar Pedido</button>
                    </div>
                </div>
                
                :

                (avaliation === false ?
                    pedidoMaisRecente.status === 'Recused' ?
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-xl font-bold">Seu pedido foi recusado</h2>
                        <FaTimesCircle className="text-[60px] text-center text-red-600" />
                        <p>O restaurante está passando por problemas por conta disso seu pedido não será concluído.</p>
                        <Link href="/restaurants" className="button">Ver outros restaurantes</Link>
                    </div>
                    :
                <div className="w-full flex flex-col gap-5 m-auto rounded-md justify-center items-center">
                    <h1 className="text-xl font-bold">Acompanhe seu pedido</h1>
                    <div className="max-w-md mb-24 w-full h-48 rounded-md">
                            <Map zipCode={data} address={restaurant.zipCode} />
                        </div>
                        <div className="px-6 lg:px-0 max-w-md flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                {!pedidoMaisRecente ? (
                                    ''
                                ) : (
                                    <>
                                    <span
                                        className={`animate-ping ${
                                        pedidoMaisRecente?.status === 'Pending'
                                            ? 'bg-yellow-400'
                                            : pedidoMaisRecente?.status === 'Recused'
                                            ? 'bg-red-600'
                                            : pedidoMaisRecente?.status === 'Accepted'
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                        } w-5 h-5 rounded-full`}
                                    ></span>
                                    <h6 className="font-bold">
                                        {pedidoMaisRecente?.status === 'Pending'
                                        ? 'Aguardando confirmação do restaurante'
                                        : pedidoMaisRecente?.status === 'Accepted'
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
                            {/* <div className="flex justify-between w-full">
                                <h6 className="font-bold">Pagamento</h6>
                                <div className="flex items-center gap-3">
                                    <FaPix className="text-green-400" />
                                    Pix
                                </div>
                            </div> */}
                           <div
                                onClick={() => {
                                    setShowChat(!showChat);
                                    clearNotification(pedidoMaisRecente?.id);
                                }}
                                className="font-bold gap-3 cursor-pointer flex justify-end items-center relative"
                                >
                                <FaRocketchat />

                                {notifiedOrders.includes(pedidoMaisRecente?.id) && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                    !
                                    </span>
                                )}

                                Chat
                            </div>
                            <button
                                onClick={handleShowAvaliationForm}
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
                </div> : '')
                    
                }

                {avaliation && (
                    loading ? (
                    <div />
                    ) : (
                    <form onSubmit={createAvaliation} className="flex flex-col gap-5">
                        <h2 className="text-xl text-center font-bold">Avalie a entrega do seu pedido</h2>
                        <div className="flex items-center justify-center gap-3">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                            key={i}
                            className={`cursor-pointer text-2xl ${
                                i < selectedStars ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                            onClick={() => setSelectedStars(i + 1)}
                            />
                        ))}
                        </div>
                        <textarea
                        name="comment"
                        className="w-full p-3 resize-none outline-none rounded-md border border-gray-300 h-28"
                        placeholder="O pedido veio excelente ..."
                        />
                        <button className="button">
                            {avalLoading ? <Loading /> : 'Enviar Avaliação'}
                        </button>
                    </form>
                    )
                )}
            </div>
            {showChat && <Chat orderId={pedidoMaisRecente.id} restaurantId={id} closeChat={setShowChat} />}
        </>
    )
}