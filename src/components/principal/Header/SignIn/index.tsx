import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, SetStateAction } from 'react';
import Image from "next/image";

interface SignInProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}

export function SignIn({ open, setOpen }:SignInProps) {
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Login</Dialog.Title>
                    <div className="rounded-md border border-gray-300 p-2 flex justify-center items-center gap-4 cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white">
                        <Image className="object-cover w-10" src="/images/google-logo.webp" width={300} height={300} alt="logo do google" />
                        <h6 className="font-bold">Continuar com o google</h6>
                    </div>
                    <form className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="font-bold">Endereço de email</label>
                            <input id="email" type="email" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className="font-bold">Senha</label>
                            <input id="password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <button className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">Entrar</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}