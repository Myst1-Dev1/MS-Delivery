'use client';

import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import Image from "next/image";
import { UserBox } from "../UserBox";
import gsap from "gsap";
import { useCart } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { Logo } from "../Logo";
import { useUser } from "@/hooks/useUser";

export function HeaderContent() {
    const { cart } = useCart();
    const { user } = useUser();
    const pathname = usePathname();
    const router = useRouter();

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

    useEffect(() => {
        if (user.isAdmin === true) {
            router.push("/system/restaurantAdmin");
        }
    }, [user, router]);

    return (
        <>
            <header className="px-4 lg:px-16 py-6 flex justify-between items-center w-full">
                <Logo />
                {user === null ? 
                <p>Carregando...</p>
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
                </>
                }
            </header>
            <SignIn open={openSignInModal} setOpen={setSignInModal} />
            <SignUp open={openSignUpModal} setOpen={setSignUpModal} />
        </>
    )
}