import { signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleSignIn } from "../homeContent";
import { useUser } from "@/hooks/useUser";
import { Loading } from "@/components/global/Loading";

interface SignInProps {
    setHaveAccount?:any;
}

export function SignIn({ setHaveAccount }:SignInProps) {
    const [loading, setLoading] = useState(false);
    const { setUser } = useUser();
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
            <form onSubmit={handleSubmit(signIn)} className="mt-10 flex flex-col max-w-80 lg:max-w-md w-full m-auto mb-10 gap-3">
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
                <p className="mt-0 text-center">Não possui uma conta? <span onClick={() => setHaveAccount('register')} className="cursor-pointer text-orange-600 font-bold">Cadastro</span></p>
                <button type="submit" className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">
                    {loading ? <Loading /> : 'Entrar'}
                </button>
            </form>
        </>
    )
}