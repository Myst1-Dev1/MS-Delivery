'use client';

import { useEffect, useState } from "react";
import { FaBell, FaShoppingBag } from "react-icons/fa";
import gsap from "gsap";
import { useCart } from "@/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { Logo } from "../Logo";
import { useUser } from "@/hooks/useUser";
import { NavBar } from "../navBar";

export function HeaderContent() {
    const { cart } = useCart();
    const { user } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    const [showUserOption, setShowUserOption] = useState(false);

    function handleShowUserOptions(option: string, height?: number) {
    
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
                height: height,
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
        if (user && user.isAdmin === true) {
            router.push("/system/restaurantAdmin");
        }
    }, [user, router]);

    return (
        <>
            <header className="px-4 lg:px-16 py-6 flex justify-between items-center w-full">
                <Logo link="/restaurants" />
                {user === null ? 
                <p>Carregando...</p>
                :
                <>
                    <div className={`flex items-center ${cart.length === 0 ? '' : 'gap-5'}`}>
                        <div className="cursor-pointer w-10 h-10 grid place-items-center bg-slate-200 rounded-full transition-all duration-500 hover:bg-orange-500 hover:text-white">
                            <FaBell data-testid="bell" />
                        </div>
                        <div className="relative">
                            <span className={`absolute bottom-[9px] right-[-11px] w-5 h-5 bg-orange-500 text-white rounded-full ${cart.length === 0 ? 'hidden' : 'flex'} justify-center items-center`}>{cart.length}</span>
                            {cart.length === 0 ? '' : <FaShoppingBag data-testid="cart" onClick={() => handleShowUserOptions('.cart', window.innerHeight)} className="text-xl cursor-pointer transition-all duration-500 hover:text-orange-500" />}
                        </div>
                    </div>
                </>
                }
            </header>
           <NavBar />
        </>
    )
}