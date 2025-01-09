import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

interface SignInProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export function SignIn({ open, setOpen }: SignInProps) {
    const [globalError, setGlobalError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function handleSignIn(values: z.infer<typeof signInSchema>) {
        try {
            await signIn("credentials", { ...values, redirect: false }).then(
                ({ error }: any) => {
                    if (!error) {
                        console.log('Login feito com sucesso');
                        setOpen(false);
                    } else {
                        setGlobalError('Credenciais erradas');
                    }
                }
            );

        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Login</Dialog.Title>
                    {/* <div className="rounded-md border border-gray-300 p-2 flex justify-center items-center gap-4 cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white">
                        <Image className="object-cover w-10" src="/images/google-logo.webp" width={300} height={300} alt="logo do google" />
                        <h6 className="font-bold">Continuar com o google</h6>
                    </div> */}
                    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="font-bold">Endereço de email</label>
                            <input
                                {...register('email')}
                                name="email"
                                id="email"
                                type="email"
                                className="border border-gray-300 rounded-md p-3 w-full outline-none"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className="font-bold">Senha</label>
                            <input
                                {...register('password')}
                                name="password"
                                id="password"
                                type="password"
                                className="border border-gray-300 rounded-md p-3 w-full outline-none"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>
                        {globalError && <span className="text-red-600 font-bold">{globalError}</span>}
                        <button type="submit" className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">Entrar</button>
                    </form>
                </div>
            </Modal>
        </>
    );
}
