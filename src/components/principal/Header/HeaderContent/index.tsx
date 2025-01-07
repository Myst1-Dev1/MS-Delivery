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
import { useCart } from "@/hooks/useCart";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";

interface HeaderContentProps {
    session:Session | null;
}

export function HeaderContent({ session }:HeaderContentProps) {
    const { cart } = useCart();
    const pathname = usePathname();
 
    const [openSignInModal, setSignInModal] = useState(false);
    const [openSignUpModal, setSignUpModal] = useState(false);
    const [showUserOption, setShowUserOption] = useState(false);

    function handleShowUserOptions(option: string, desktopHeight: number, mobileHeight?: number) {
        const isMobile = window.innerWidth <= 768;
        const targetHeight = isMobile ? mobileHeight : desktopHeight;
    
        if (showUserOption) {
            gsap.to(`${option}`, {
                opacity: 0,
                display: 'none',
                height: 0,
                duration: 0.4,
                ease: 'power1.inOut',
                onComplete: () => setShowUserOption(false),
            });
        } else {
            setShowUserOption(!showUserOption);
            gsap.to(`${option}`, {
                opacity: 1,
                display: 'block',
                height: targetHeight,
                duration: 0.4,
                ease: 'power1.inOut',
            });
        }
    }
    
    useGSAP(() => {
        if (showUserOption) {
            gsap.to(".user-box", {
              opacity: 0,
              display: "none",
              height: 0,
              duration: 0.4,
              ease: "power1.inOut",
              onComplete: () => setShowUserOption(false),
            });
          }
        if (showUserOption) {
          gsap.to(".cart", {
            opacity: 0,
            display: "none",
            height: 0,
            duration: 0.4,
            ease: "power1.inOut",
            onComplete: () => setShowUserOption(false),
          });
        }
      }, [pathname]);

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
                        <div className="relative">
                            <span className={`absolute bottom-[9px] right-[-11px] w-5 h-5 bg-orange-500 text-white rounded-full ${cart.length === 0 ? 'hidden' : 'flex'} justify-center items-center`}>{cart.length}</span>
                            <FaShoppingBag onClick={() => handleShowUserOptions('.cart', 500, window.innerHeight)} className="text-xl cursor-pointer transition-all duration-500 hover:text-orange-500" />
                        </div>
                        <Image onClick={() => handleShowUserOptions('.user-box', 158, 160)} className="w-10 h-10 object-cover cursor-pointer" src="/images/user-icon.png" width={500} height={500} alt="icone de usuário" />
                    </div>
                   <UserBox />
                   <Cart handleShowUserOptions = {handleShowUserOptions} />
                </>
                }
            </header>
            <SignIn open={openSignInModal} setOpen={setSignInModal} />
            <SignUp open={openSignUpModal} setOpen={setSignUpModal} />
        </>
    )
}