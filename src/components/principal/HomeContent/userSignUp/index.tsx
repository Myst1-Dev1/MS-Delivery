import { handleCreateUserAccount } from "@/app/actions/AuthActions";
import { Loading } from "@/components/global/Loading";
import { handleCepChange } from "@/utils/cepChange";
import { useActionState } from "react";

interface userSignUpProps {
    setHaveAccount:any;
}

export function UserSignUp({ setHaveAccount }:userSignUpProps) {
    const [formState, formAction, pending] = useActionState(handleCreateUserAccount, { errors: {} });

    return (
        <>
            <form action={formAction} className="flex flex-col gap-3">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">Nome</label>
                        <input className="input" type="text" id="name" name="name" placeholder="john" />
                        {formState.errors?.name && <p className="text-red-500 text-sm">{formState.errors.name[0]}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email">Email</label>
                        <input className="input" type="email" id="email" name="email" placeholder="john@gmail.com" />
                        {formState.errors?.email && <p className="text-red-500 text-sm">{formState.errors.email[0]}</p>}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="zipCode">CEP</label>
                        <input className="input" type="tel" id="zipCode" name="zipCode" placeholder="12345-00" onBlur={(e) => handleCepChange(e.target.value)} />
                        {formState.errors?.zipCode && <p className="text-red-500 text-sm">{formState.errors.zipCode[0]}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="address">Endereço</label>
                        <input className="input" type="text" id="address" name="address" placeholder="Rua San Loren Av 15" />
                        {formState.errors?.address && <p className="text-red-500 text-sm">{formState.errors.address[0]}</p>}
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="password">Senha</label>
                        <input className="input" type="password" id="password" name="password" placeholder="***********" />
                        {formState.errors?.password && <p className="text-red-500 text-sm">{formState.errors.password[0]}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="comfirm_password">Confirme a Senha</label>
                        <input className="input" type="password" id="comfirm_password" name="confirm_password" placeholder="***********" />
                        {formState.errors?.confirm_password && <p className="text-red-500 text-sm">{formState.errors.confirm_password[0]}</p>}
                    </div>
                </div>
                <p className="mt-0 text-center">Já possui uma conta? <span onClick={() => setHaveAccount('login')} className="cursor-pointer text-orange-600 font-bold">Login</span></p>
                <button className="button" type="submit">
                    {pending ? <Loading /> : 'Cadastrar'}
                </button>
                <p className="text-green-500">
                    {pending ? "" : formState.message}
                </p>
            </form>
        </>
    )
}