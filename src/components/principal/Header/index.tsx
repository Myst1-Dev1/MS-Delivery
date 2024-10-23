'use client';

import Link from "next/link";
import { CiForkAndKnife } from "react-icons/ci";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { useState } from "react";

export function Header() {
    const [openSignInModal, setSignInModal] = useState(false);
    const [openSignUpModal, setSignUpModal] = useState(false);

    return (
        <>
            <header className="px-4 lg:px-16 py-6 flex justify-between items-center w-full">
                <Link href="/" className="flex gap-3 items-center">
                    <h1 className="font-bold text-xl lg:text-2xl"><span className="text-orange-500">MS</span> Delivery</h1>
                    <CiForkAndKnife className="text-orange-500 text-xl" />
                </Link>
                <div className="flex gap-5 items-center">
                    <button onClick={() => setSignInModal(true)} className="p-3 border border-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-500 hover:text-white">Login</button>
                    <button onClick={() => setSignUpModal(true)} className="p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Cadastro</button>
                </div>
            </header>
            <SignIn open={openSignInModal} setOpen={setSignInModal} />
            <SignUp open={openSignUpModal} setOpen={setSignUpModal} />
        </>
    )
}