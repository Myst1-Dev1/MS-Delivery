'use server';

import { fetchRestaurantByUserId } from "@/services/fetchData/fetchRestaurantByUserId";
import { cookies } from "next/headers";
import Link from "next/link";

interface HaveRestaurantProps {
    children:any;
}

export async function HaveRestaurant({ children }:HaveRestaurantProps) {
    const cookie = await cookies();
    const id:any = cookie.get('user-token')

    const token = cookie.get('token')

    console.log(token);

    const user = JSON.parse(id?.value);
    const getAdminDetails = await fetchRestaurantByUserId(user.id);
    
    return (
        <>
            {getAdminDetails.length === 0 ? 
                    <div className="min-h-screen w-full bg-vector-bg m-auto grid place-content-center">
                        <div className="flex text-center flex-col gap-3 bg-white m-auto max-w-96 p-3 rounded-md">
                            <p className="text-xl font-bold">
                                Olá! Parabéns por criar sua conta de administrador.
                            </p>
                            <p className="text-lg text-gray-600 max-w-80">
                                Agora vamos criar o seu restaurante para que você possa adicionar os seus pratos, gerenciar os pedidos e acompanhar as vendas.
                            </p>
                            <Link className="button mt-4" href="/createRestaurant">
                                Criar Restaurante
                            </Link>
                        </div>
                    </div>
                :
                <>
                    {children}
                </>
            }
        </>
    )
}