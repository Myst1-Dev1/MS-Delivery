import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loading } from "@/components/global/Loading";
import { api } from "@/services/axios";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

interface SignInProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export function SignIn({ open, setOpen }: SignInProps) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function handleSignIn(values: z.infer<typeof signInSchema>) {
        setLoading(true);
        try {
            const res = await api.post("/auth/login", { email: values.email, password: values.password },
                { withCredentials: true }
            );
            setCookie(undefined, 'user-token', JSON.stringify(res.data), {
                maxAge: 604800, // 7 dias em segundos
                path: '/', // Garante que o cookie seja acessível em todo o site
            });

            setOpen(false);
            router.push(`/${user.iAdmin === true ? 'createRestaurant' : '/'}`);
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Login</Dialog.Title>
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
                        <button type="submit" className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">
                            {loading ? <Loading /> : 'Entrar'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
}
