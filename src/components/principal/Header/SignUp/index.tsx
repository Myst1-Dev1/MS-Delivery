'use client';

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from "react-toastify";
import { Loading } from "@/components/global/Loading";

interface SignUpProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}

export function SignUp({ open, setOpen }:SignUpProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSignUp(e: FormEvent | any) {
        e.preventDefault();
        setLoading(true);
        try {
          const formData = new FormData(e.target);
          const formEntries = Object.fromEntries(formData.entries());
          const { name, email, password, confirm_password, address, zipCode } = formEntries as { [key: string]: string };
      
          if(password !== confirm_password) { return setError('As senhas não coincidem'); }

          const response = await fetch('/api/auth/signUp', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, address, zipCode }),
          });

          if (!response.ok) {
            const error = await response.json();
            console.error("Erro:", error.error);
            toast.error('Tivemos um erro na criação de sua conta.');
            return;
          }
      
          const result = await response.json();
          console.log(result.message);
          toast.success('Sua conta foi criada com sucesso');
          setOpen(false);
          setError('');
        } catch (error) {
          console.error("Erro no cliente:", error);
        } finally { setLoading(false) }
      }

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Cadastro</Dialog.Title>
                    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                        <div className="flex justify-between flex-col lg:flex-row">
                          <div className="flex flex-col gap-3 lg:mb-0 mb-4">
                              <label htmlFor="name" className="font-bold">Nome</label>
                              <input name="name" id="name" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                          </div>
                          <div className="flex flex-col gap-3 lg:mb-0 mb-4">
                              <label htmlFor="email" className="font-bold">Email</label>
                              <input name="email" id="email" type="email" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                          </div>
                        </div>
                        <div className="flex justify-between flex-col lg:flex-row">
                            <div className="flex flex-col gap-3 lg:mb-0 mb-4">
                                <label htmlFor="address" className="font-bold">Endereço</label>
                                <input name="address" id="address" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                            </div>
                            <div className="flex flex-col gap-3 lg:mb-0 mb-4">
                                <label htmlFor="zipCode" className="font-bold">CEP</label>
                                <input name="zipCode" id="zipCode" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                            </div>
                        </div>
                        <div className="flex justify-between flex-col lg:flex-row">
                          <div className="flex flex-col gap-3 lg:mb-0 mb-4">
                              <label htmlFor="password" className="font-bold">Senha</label>
                              <input name="password" id="password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                          </div>
                          <div className="flex flex-col gap-3">
                              <label htmlFor="confirm_password" className="font-bold">Confirmar Senha</label>
                              <input name="confirm_password" id="confirm_password" type="password" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                          </div>
                        </div>
                        <button className="p-3 w-full rounded-md bg-orange-500 font-bold text-white transition-all duration-500 hover:bg-orange-600">
                          {loading ? <Loading /> : 'Criar Conta'}
                        </button>
                        {error !== '' ? <span className="text-center text-red-600 font-bold">{error}</span> : ''}
                    </form>
                </div>
            </Modal>
        </>
    )
}