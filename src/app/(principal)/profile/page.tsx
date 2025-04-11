'use client';

import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function Profile() {
    const { user } = useUser();

    return (
        <>
            <div className="py-10 px-4 lg:px-16">
                <div className="flex items-center gap-3">
                    <Image className="w-16 h-16 rounded-full object-cover" src="/images/user-icon.png" width={200} height={200} alt="icone de usuário" />
                    <h2 className="font-bold text-xl">John</h2>
                </div>
                <form className="mt-4 flex flex-col gap-3" action="">
                    <h3 className="font-semibold">Editar perfil</h3>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name">Nome</label>
                            <input className="input text-gray-500 font-thin" type="text" defaultValue={user?.name} id="name" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email">Email</label>
                            <input className="input text-gray-500 font-thin" type="email" defaultValue={user?.email} id="email" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="address">Endereço</label>
                            <input className="input text-gray-500 font-thin" type="text" defaultValue={user?.address} id="address" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="zipCode">CEP</label>
                            <input className="input text-gray-500 font-thin" type="tel" defaultValue={user?.zipCode} id="zipCode" />
                        </div>
                    </div>
                    <button className="button w-full max-w-60 mt-3 m-auto">Atualizar perfil</button>
                </form>
            </div>
        </>
    )
}