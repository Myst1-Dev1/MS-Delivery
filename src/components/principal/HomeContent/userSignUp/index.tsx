import { Loading } from "@/components/global/Loading";
import { signUpSchema } from "@/lib/zod";
import { api } from "@/services/axios";
import { handleCepChange } from "@/utils/cepChange";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface userSignUpProps {
    setHaveAccount:any;
}

export function UserSignUp({ setHaveAccount }:userSignUpProps) {
    const [pending, setPending] = useState(false);

    const { register, handleSubmit , formState: { errors } } = 
        useForm({resolver:zodResolver(signUpSchema),
            defaultValues: {
                name: "",
                email: "",
                address: "",
                zipCode: "",
                password: "",
                comfirm_password: "",
        }
    });

    async function handleCreateUserAccount(data:any) {
        try {
            setPending(true);
            
            await api.post("/auth/register", {
                name: data.name,
                email: data.email,
                address: data.address,
                zipCode: data.zipCode,
                password: data.password,
                isAdmin: false
            });

            toast.success("Conta de usuário criada com sucesso!");
        } catch (error) {
            console.log(error);
        }finally {
            setPending(false);
            setHaveAccount('login');
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateUserAccount)} className="flex flex-col gap-3">
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
                        <label htmlFor="zipCode">CEP</label>
                        <input className="input" type="tel" id="zipCode" {...register("zipCode")} placeholder="12345-00" onBlur={(e) => handleCepChange(e.target.value)} />
                        {errors?.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="address">Endereço</label>
                        <input className="input" type="text" id="address" {...register("address")} placeholder="Rua San Loren Av 15" />
                        {errors?.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="password">Senha</label>
                        <input className="input" type="password" id="password" {...register("password")} placeholder="***********" />
                        {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="comfirm_password">Confirme a Senha</label>
                        <input className="input" type="password" id="comfirm_password" {...register("comfirm_password")} placeholder="***********" />
                        {errors?.comfirm_password && <p className="text-red-500 text-sm">{errors.comfirm_password.message}</p>}
                    </div>
                </div>
                <p className="mt-0 text-center">Já possui uma conta? <span onClick={() => setHaveAccount('login')} className="cursor-pointer text-orange-600 font-bold">Login</span></p>
                <button className="button" type="submit">
                    {pending ? <Loading /> : 'Cadastrar'}
                </button>
            </form>
        </>
    )
}