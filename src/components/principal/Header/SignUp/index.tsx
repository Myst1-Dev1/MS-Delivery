import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, FormEvent, SetStateAction } from 'react';

interface SignUpProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}

export function SignUp({ open, setOpen }:SignUpProps) {

    async function handleSignUp(e: FormEvent | any) {
        e.preventDefault();
      
        try {
          const formData = new FormData(e.target);
          const formEntries = Object.fromEntries(formData.entries());
          const { name, email, password } = formEntries as { [key: string]: string };
      
          const response = await fetch('/api/auth/signUp', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });
      
          if (!response.ok) {
            const error = await response.json();
            console.error("Erro:", error.error);
            return;
          }
      
          const result = await response.json();
          console.log(result.message);
        } catch (error) {
          console.error("Erro no cliente:", error);
        }
      }

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Cadastro</Dialog.Title>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="name" className="font-bold">Nome</label>
                            <input name="name" id="name" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="email" className="font-bold">Endereço de email</label>
                            <input name="email" id="email" type="email" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="password" className="font-bold">Senha</label>
                            <input name="password" id="password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="confirm_password" className="font-bold">Confirmar Senha</label>
                            <input name="confirm_password" id="confirm_password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <button className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">Criar Conta</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}