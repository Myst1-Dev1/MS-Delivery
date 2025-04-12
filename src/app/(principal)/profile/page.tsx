'use client';

import { Loading } from "@/components/global/Loading";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
    const { user, setUser } = useUser();
    
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    async function updateUser(e: FormData | any) {
        e.preventDefault();
        setPending(true);
      
        const formData = new FormData(e.currentTarget);
        const { name, email, address, zipCode } = Object.fromEntries(formData);
      
        try {
          const res = await api.put('/user/' + user?.id, {
            name,
            email,
            address,
            zipCode,
            isAdmin:false
          });

        setCookie(undefined, 'user-token', JSON.stringify(res.data), {
            maxAge: 604800, // 7 dias em segundos
            path: '/', // Garante que o cookie seja acessível em todo o site
        });
      
          setUser(res.data);
          toast.success('Perfil atualizado com sucesso');
          router.refresh();
          console.log(res.data);
        } catch (error:any) {
            const errorMessage = error?.response?.data?.message || 'Erro inesperado ao atualizar o perfil.';
            console.error('Erro ao atualizar perfil:', errorMessage);
            setError(errorMessage);
        } finally {
          setPending(false);
        }

        setError('');
      }      

    return (
        <>
            <div className="py-10 px-4 lg:px-16">
                <div className="flex items-center gap-3">
                    <Image className="w-16 h-16 rounded-full object-cover" src="/images/user-icon.png" width={200} height={200} alt="icone de usuário" />
                    <h2 className="font-bold text-xl">{user === null ? 'Carregando...' : user?.name}</h2>
                </div>
                <form onSubmit={updateUser} className="mt-4 flex flex-col gap-3">
                    <h3 className="font-semibold">Editar perfil</h3>
                    <input className="hidden" type="text" name="id" defaultValue={user?.id} readOnly />
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name">Nome</label>
                            <input className="input text-gray-500 font-thin" name="name" type="text" defaultValue={user?.name} id="name" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email">Email</label>
                            <input className="input text-gray-500 font-thin" name="email" type="email" defaultValue={user?.email} id="email" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="address">Endereço</label>
                            <input className="input text-gray-500 font-thin" name="address" type="text" defaultValue={user?.address} id="address" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="zipCode">CEP</label>
                            <input className="input text-gray-500 font-thin" name="zipCode" type="tel" defaultValue={user?.zipCode} id="zipCode" />
                        </div>
                    </div>
                    <span className="text-red-600 text-center">{error}</span>
                    <button className="button w-full max-w-60 mt-3 m-auto">{pending ? <Loading /> : 'Atualizar perfil'}</button>
                </form>
            </div>
        </>
    )
}