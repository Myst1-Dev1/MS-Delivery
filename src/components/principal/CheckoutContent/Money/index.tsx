import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/axios";
import { createOrder } from "@/services/graphql/graphql";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"

interface MoneyProps {
    setPaymentValue:Dispatch<SetStateAction<string>>
}

export function Money({ setPaymentValue }:MoneyProps) {
    const { cart, totalCart } = useCart();
    const { user } = useUser();

    const router = useRouter();

    const id = "67d494cfb882ae0b953823d2";

    async function handleCreateOrder() {
        try {
            await api.post("/orders/" + id, {
                userName: user.name,
                address: user.address,
                orderItems: cart.map(item => item.product.name),
                additionalInformations: cart.map(info => info.observation),
                zipCode: user.zipCode,
                orderValue: totalCart,
                restaurantId: id,
                status: false,
                userId: user.id
            });
            
            router.push('/orderInProgress');
            revalidatePath('http://localhost:3000/system/ordersAdmin');
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