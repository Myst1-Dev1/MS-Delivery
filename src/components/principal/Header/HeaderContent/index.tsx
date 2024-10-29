'use client';

import Link from "next/link";
import { CiForkAndKnife } from "react-icons/ci";
import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import { useState } from "react";
import { Session } from "next-auth";
import { FaShoppingBag } from "react-icons/fa";
import Image from "next/image";
import { UserBox } from "../UserBox";
import gsap from "gsap";
import { Cart } from "../Cart";

interface HeaderContentProps {
    session:Session | null;
}

export function HeaderContent({ session }:HeaderContentProps) {

    const [openSignInModal, setSignInModal] = useState(false);
    const [openSignUpModal, setSignUpModal] = useState(false);
    const [showUserOption, setShowUserOption] = useState(false);

    function handleShowUserOptions(option:string, height:number) {
        if (showUserOption) {
            gsap.to(`${option}`, { opacity: 0, display: 'none', height: 0, duration: 0.4, ease: 'power1.inOut', onComplete: () => setShowUserOption(false) });
        } else {
            setShowUserOption(!showUserOption);
            gsap.to(`${option}`, { opacity: 1, display: 'block', height: height, duration: 0.4, ease: 'power1.inOut' });
        }
    }

    return (
        <>
            <header className="px-4 lg:px-16 py-6 flex justify-between items-center w-full">
                <Link href="/" className="flex gap-3 items-center">
                    <h1 className="font-bold text-xl lg:text-2xl"><span className="text-orange-500">MS</span> Delivery</h1>
                    <CiForkAndKnife className="text-orange-500 text-xl" />
                </Link>
                {!session ? 
                <div className="flex gap-5 items-center">
                    <button onClick={() => setSignInModal(true)} className="p-3 border border-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-500 hover:text-white">Login</button>
                    <button onClick={() => setSignUpModal(true)} className="p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Cadastro</button>
                </div>
                :
                <>
                    <div className="flex items-center gap-5">
                        <FaShoppingBag onClick={() => handleShowUserOptions('.cart', 500)} className="text-xl cursor-pointer transition-all duration-500 hover:text-orange-500" />
                        <Image onClick={() => handleShowUserOptions('.user-box', 158)} className="w-10 h-10 object-cover cursor-pointer" src="/images/user-icon.png" width={500} height={500} alt="icone de usuário" />
                    </div>
                   <UserBox />
                   <Cart />
                </>
                }
            </header>
            <SignIn open={openSignInModal} setOpen={setSignInModal} />
            <SignUp open={openSignUpModal} setOpen={setSignUpModal} />
        </>
    )
}