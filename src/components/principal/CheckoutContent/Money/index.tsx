import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders"
import { useUser } from "@/hooks/useUser";
import { Dispatch, SetStateAction } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"

interface MoneyProps {
    setPaymentValue:Dispatch<SetStateAction<string>>
}

export function Money({ setPaymentValue }:MoneyProps) {
    const { cart, totalCart } = useCart();
    const { user } = useUser();
    const { createOrder } = useOrders();

    const id = '67dd93593a93ced30563d957';

    return (
        <div className="flex flex-col gap-3 relative">
            <RiArrowGoBackFill onClick={() => setPaymentValue('')} className="absolute text-xl -right-4 -top-2 cursor-pointer" />
            <label htmlFor="money" className="font-bold text-xl">Precisa de troco?</label>
            <input id="money" type="tel" placeholder="R$:0,00" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
            <div className="flex justify-center">
                <button onClick={() =>
                    createOrder.mutate({
                        cart, 
                        id, 
                        user, 
                        totalCart
                    })
                } className="mt-5 button">
                    Finalizar pedido
                </button>
            </div>
        </div>
    )
}