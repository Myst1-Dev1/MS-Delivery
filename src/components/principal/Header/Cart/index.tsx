import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface CartProps {
    handleShowUserOptions:(option:string, height:number, mobileHeight:number) => void;
}

export function Cart({ handleShowUserOptions }:CartProps) {
    const { cart, handleRemoveToCart, totalCart } = useCart();

    console.log(cart);

    return (
        <>
            <div className="z-50 cart opacity-0 hidden h-screen lg:h-[500px] bg-white lg:max-w-80 fixed lg:absolute top-0 lg:top-20 right-0 w-full p-3 rounded-lg border border-[#ededed]">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <FaTimes onClick={() => handleShowUserOptions('.cart', 500, window.innerHeight)} className="absolute top-3 right-2 cursor-pointer transition-all duration-500 hover:text-orange-500" />
                        <h5 className="text-xl font-bold">Carrinho</h5>
                        <h6 className="mt-3 font-bold">Meu pedido</h6>
                        <div className="mt-5 flex flex-col overflow-y-scroll scrollDontShow h-60 gap-4">
                        {cart.length === 0 ? 'Seu carrinho está vazio 😔' : cart?.map(item => (
                            <div key={item.product.id} className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-3">
                                    <Image className="w-20 h-20 object-cover rounded-md" src={item.product.image.url || '/images/cheddar-burguer.jpg'} width={500} height={500} alt="foto do item no pedido" />
                                    <div className="flex flex-col gap-2">
                                        <h6>{item.product.name}</h6>
                                        <h5 className="font-bold text-xl">{FormatPrice(item.product.price * item.quantity)}</h5>
                                    </div>
                                </div>
                                <FaTimes onClick={() => handleRemoveToCart(item.product.id)} className="cursor-pointer text-red-600" />
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-300">
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold">Total</h6>
                            <h6 className="font-bold">{FormatPrice(totalCart)}</h6>
                        </div>
                        <Link className={`${cart.length === 0 ? 'pointer-events-none' : 'pointer-events-auto'}`} href="/checkout">
                            <button className={`${cart.length === 0 ? 'opacity-60' : 'opacity-100'} mt-4 font-bold bg-orange-500 text-white rounded-md p-3 w-full transition-all duration-500 hover:bg-orange-600`}>Fazer pedido</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}