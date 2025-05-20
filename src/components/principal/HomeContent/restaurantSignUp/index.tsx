import { Loading } from "@/components/global/Loading";
import { api } from "@/services/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpRestaurantSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface RestaurantSignUpProps {
    setHaveAccount:any;
}

export function RestaurantSignUp({ setHaveAccount }:RestaurantSignUpProps) {
    const [pending, setPending] = useState(false);

    const { register, handleSubmit , formState: { errors } } = 
        useForm({resolver:zodResolver(signUpRestaurantSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
                comfirm_password: ""
            }
    });

    async function handleCreateRestaurantAccount(data:any) {
        try {
            setPending(true);

            const res = await api.post("/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
                isAdmin: true
            });

            console.log(res.data);

            toast.success("Conta de admin criada com sucesso!");
        } catch (error) {
            console.log(error);
        } finally {
            setPending(false);
            setHaveAccount('login');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateRestaurantAccount)} className="flex flex-col gap-3">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">Nome</label>
                        <input className="input" type="text" id="name" {...register("name")} placeholder="john" />
                        {errors?.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="email" id="email" {...register("email")} placeholder="john@gmail.com" />
                        {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="password">Senha</label>
                        <input className="input" type="password" id="password" {...register("password")} placeholder="***********" />
                        {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="comfirm_password">Confirme a senha</label>
                        <input className="input" type="password" id="comfirm_password" {...register("comfirm_password")} placeholder="***********" />
                        {errors?.comfirm_password && <p className="text-red-500 text-sm">{errors.comfirm_password.message}</p>}
                    </div>
                </div>
                <p className="mt-0 text-center">Já possui uma conta? <span onClick={() => setHaveAccount('login')} className="cursor-pointer text-orange-600 font-bold">Login</span></p>
                <button className="button" type="submit">{pending ? <Loading /> : 'Cadastrar'}</button>
            </form>
        </>
    )
}