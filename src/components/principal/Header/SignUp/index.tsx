import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, SetStateAction } from 'react';

interface SignUpProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}

export function SignUp({ open, setOpen }:SignUpProps) {
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Cadastro</Dialog.Title>
                    <form className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="font-bold">Endereço de email</label>
                            <input id="email" type="email" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className="font-bold">Senha</label>
                            <input id="password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="confirm_password" className="font-bold">Confirmar Senha</label>
                            <input id="confirm_password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <button className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">Criar Conta</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}