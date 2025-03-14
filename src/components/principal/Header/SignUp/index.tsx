'use client';

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from '@/components/global/Modal';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { toast } from "react-toastify";
import { Loading } from "@/components/global/Loading";
import { api } from "@/services/axios";

interface SignUpProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
}

export function SignUp({ open, setOpen }:SignUpProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(false);
    const [restaurant, setRestaurant] = useState(false);

    async function handleUserSignUp(e: FormEvent | any) {
        e.preventDefault();
        setLoading(true);
        try {
          const formData = new FormData(e.target);
          const formEntries = Object.fromEntries(formData.entries());
          const { name, email, password, confirm_password, address, zipCode } = formEntries as { [key: string]: string };
      
          if(password !== confirm_password) { return setError('As senhas não coincidem'); }
          const response = await api.post("/auth/register", { 
            name, 
            email, 
            password, 
            isAdmin: false,
            address,
            zipCode
          });

          if (response.status !== 200) {
            const error = await response.data();
            console.error("Erro:", error.error);
            toast.error('Tivemos um erro na criação de sua conta.');
            return;
          }
  
          toast.success('Sua conta foi criada com sucesso');
          setOpen(false);
          setError('');
        } catch (error) {
          console.error("Erro no cliente:", error);
        } finally { setLoading(false) }
    }

    async function handleRestaurantSignUp(e: FormEvent | any) {
      e.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData(e.target);
        const formEntries = Object.fromEntries(formData.entries());
        const { name, email, password, confirm_password } = formEntries as { [key: string]: string };
    
        if(password !== confirm_password) { return setError('As senhas não coincidem'); }
        const response = await api.post("/auth/registerRestaurant", { 
          name, 
          email, 
          password, 
          isAdmin: true
        });

        if (response.status !== 200) {
          const error = await response.data();
          console.error("Erro:", error.error);
          toast.error('Tivemos um erro na criação de sua conta.');
          return;
        }

        toast.success('Sua conta foi criada com sucesso');
        setOpen(false);
        setError('');
      } catch (error) {
        console.error("Erro no cliente:", error);
      } finally { setLoading(false) }
    }

    const handleOpenUserForm = () => { if (restaurant) { setRestaurant(false); } setUser(!user);};
    const handleOpenRestaurantForm = () => { if (user) { setUser(false); } setRestaurant(!restaurant);};

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="p-4 flex flex-col gap-3">
                    <Dialog.Title className="text-2xl text-center font-bold">Cadastro</Dialog.Title>
                    <div>
                      <h3 className="text-center font-bold mb-3">Criar conta como</h3>
                      <div className="flex gap-3 justify-between">
                        <button onClick={handleOpenUserForm} className="button bg-orange-400 w-full text-center">Usuário</button>
                        <button onClick={handleOpenRestaurantForm} className="button bg-orange-400 w-full text-center">Restaurante</button>
                      </div>
                    </div>
                    {user && 
                      <form onSubmit={handleUserSignUp} className="flex flex-col gap-3">
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
                    }
                     {restaurant && 
                      <form onSubmit={handleRestaurantSignUp} className="flex flex-col gap-3">
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
                    }
                </div>
            </Modal>
        </>
    )
}