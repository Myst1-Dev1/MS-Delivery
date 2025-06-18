import { Modal } from "@/components/global/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStore, FaTimes, FaUser } from "react-icons/fa";
import { UserSignUp } from "../userSignUp";
import { RestaurantSignUp } from "../restaurantSignUp";
import { SignIn } from "../signIn";

interface SignModalProps {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
    haveAccount:string,
    setHaveAccount:any
}

export function SignModal({ openModal, setOpenModal, haveAccount, setHaveAccount }:SignModalProps) {
    const [accountType, setAccountType] = useState('user');

    return (
        <>
            <Modal open={openModal} setOpen={setOpenModal} >
                <div onClick={() => setOpenModal(false)} className="w-10 h-10 rounded-full text-white bg-orange-400 cursor-pointer absolute top-2 right-2 grid place-items-center text-xl transition-all duration-500 hover:brightness-90 hover:scale-110">
                    <FaTimes />
                </div>
                <Dialog.Title className="font-bold text-2xl text-center mt-10">{haveAccount === 'login' ? 'Bem vindo' : 'Criar conta'}</Dialog.Title>
                {haveAccount === 'register' &&
                <div>
                    <div className="flex m-auto flex-wrap max-w-80 lg:max-w-md w-full justify-between lg:gap-0 gap-6 py-8">
                        <div onClick={() => setAccountType('user')} className={`max-w-36 lg:max-w-40 flex items-center gap-3 w-full p-3 border border-gray-300 rounded-lg ${accountType === 'user' ? 'bg-orange-500 border-0 text-white' : ''} cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white`}>
                            <FaUser />
                            Usuário
                        </div>
                        <div onClick={() => setAccountType('restaurant')} className={`max-w-36 lg:max-w-40 flex items-center gap-3 w-full p-3 border border-gray-300 rounded-lg ${accountType === 'restaurant' ? 'bg-orange-500 border-0 text-white' : ''} cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white`}>
                            <FaStore />
                            Restaurante
                        </div>
                    </div>
                    {accountType === 'user' && <UserSignUp setHaveAccount={setHaveAccount} />}
                    {accountType === 'restaurant' && <RestaurantSignUp setHaveAccount={setHaveAccount} />}
                </div>
                }
                {haveAccount === 'login' && <SignIn setHaveAccount={setHaveAccount} />}
            </Modal>
        </>
    )
}