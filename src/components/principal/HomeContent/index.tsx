'use client';

import { Loading } from "@/components/global/Loading";
import { Logo } from "@/components/principal/Header/Logo";
import Image from "next/image";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { UserSignUp } from "./userSignUp";
import { RestaurantSignUp } from "./restaurantSignUp";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/hooks/useUser";
import { handleSignIn } from "./homeContent";

export default function HomeContent() {
    const { setUser } = useUser();

    const [accountType, setAccountType] = useState('user');
    const [haveAccount, setHaveAccount] = useState('login');
    const [loading, setLoading] = useState(false);
    
        const router = useRouter();
    
        const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
            resolver: zodResolver(signInSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        });

    async function signIn(values: z.infer<typeof signInSchema>) {
        try {
            await handleSignIn(values, setLoading, setUser, router);
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="px-4 py-10 lg:py-0 lg:px-0 flex flex-col lg:flex-row justify-between items-center lg:gap-0 gap-5">
                <div className="bg-[#202020] w-full lg:w-1/2 min-h-screen hidden lg:grid place-items-center text-white">
                   <div className="px-5 flex flex-col justify-center items-center gap-4">
                        <Logo color="text-white" />
                        <Image src="/images/delivery-man.svg" width={400} height={400} alt="foto de um sistema de entrega" />
                        <p>
                            Facilite a gestão do seu restaurante e otimize suas operações com o MS Delivery, a solução completa para o seu negócio
                        </p>
                   </div>
                </div>

                {haveAccount === 'login' &&
                    <div className="w-full max-w-[426px] m-auto flex flex-col gap-4">
                        <h2 className="text-2xl text-center font-bold">Bem vindo</h2>
                        <form onSubmit={handleSubmit(signIn)} className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="email">Endereço de email</label>
                                <input
                                    {...register('email')}
                                    name="email"
                                    id="email"
                                    type="email"
                                    className="input"
                                    placeholder="john2doe@gmail.com"
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="password">Senha</label>
                                <input
                                    {...register('password')}
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="input"
                                    placeholder="********"
                                />
                                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            </div>
                            <p className="mt-0 text-center">Não possui uma conta? <span onClick={() => setHaveAccount('signUp')} className="cursor-pointer text-orange-600 font-bold">Cadastro</span></p>
                            <button type="submit" className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">
                                {loading ? <Loading /> : 'Entrar'}
                            </button>
                        </form>
                    </div>
                }

                {haveAccount === 'signUp' &&
                <div className=" m-auto flex flex-col gap-4">
                    <h2 className="text-2xl text-center font-bold">Criar conta</h2>
                    <div className="flex gap-3">
                        <div onClick={() => setAccountType('user')} className={`cursor-pointer w-full flex items-center justify-center gap-3 p-3 rounded-md ${accountType === 'user' ? 'bg-orange-600 text-white' : 'border border-gray-500'} transition-all duration-500 hover:bg-orange-700 hover:text-white`}>
                            Usuário
                            <FaUser />
                        </div>
                        <div onClick={() => setAccountType('restaurant')} className={`cursor-pointer w-full flex items-center justify-center gap-3 p-3 rounded-md ${accountType === 'restaurant' ? 'bg-orange-600 text-white' : 'border border-gray-500'} transition-all duration-500 hover:bg-orange-700 hover:text-white`}>
                            Restaurante
                            <FaShop />
                        </div>
                    </div>
                    {accountType === 'user' && <UserSignUp setHaveAccount={setHaveAccount} /> }

                    {accountType === 'restaurant' && <RestaurantSignUp setHaveAccount={setHaveAccount} />}
                </div>
                }
            </div>
        </>
    )
}