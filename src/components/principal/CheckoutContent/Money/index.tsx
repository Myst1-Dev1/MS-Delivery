import { useCart } from "@/hooks/useCart";
import { createOrder } from "@/services/graphql/graphql";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"

interface MoneyProps {
    setPaymentValue:Dispatch<SetStateAction<string>>
}

export function Money({ setPaymentValue }:MoneyProps) {
    const { cart, totalCart } = useCart();

    const { data:session } = useSession();

    const router = useRouter();

    async function handleCreateOrder() {
        try {
            const res = await createOrder(
                session?.user.name,
                session?.user.address,
                cart.map(item => item.observation).join(", "),
                session?.user.zipCode,
                totalCart,
                cart.map(item => item.product.name).join(", ")
            );
            
            router.push('/orderInProgress');
            console.log('sucesso', res);
        } catch (error) {
            console.log('Erro ao criar pedido:', error);
        }
    }

    return (
        <div className="flex flex-col gap-3 relative">
            <RiArrowGoBackFill onClick={() => setPaymentValue('')} className="absolute text-xl -right-4 -top-2 cursor-pointer" />
            <label htmlFor="money" className="font-bold text-xl">Precisa de troco?</label>
            <input id="money" type="tel" placeholder="R$:0,00" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
            <div className="flex justify-center">
                <button onClick={handleCreateOrder} className="mt-5 button">Finalizar pedido</button>
            </div>
        </div>
    )
}