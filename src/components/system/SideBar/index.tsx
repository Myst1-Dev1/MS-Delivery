'use client';

import { Logo } from "@/components/principal/Header/Logo";
import { useTheme } from "@/hooks/useTheme";
import { api } from "@/services/axios";
import gsap from "gsap";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { FaBars, FaChartBar, FaClipboardList, FaSignOutAlt, FaTimes, FaUtensils } from "react-icons/fa";

export function SideBar() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    function handleOpenResponsiveSideBar() {
        gsap.fromTo('.sideBar', { left:"-100%" }, { left:0, duration:0.4, ease:'power1.inOut' })
    }

    function handleCloseResponsiveSideBar() {
        gsap.fromTo('.sideBar', { left:0 }, { left:"-100%", duration:0.4, ease:'power1.inOut' })
    }

    async function handleSignOut() {
        try {
            const res = await api.post('auth/logout', {}, {
                withCredentials: true
            });
    
            destroyCookie(null, 'user-token', {
                path: '/',
            });
    
            console.log('Logout success', res.data);
            window.location.href = '/';
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    }

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth <= 991);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="max-w-0 lg:max-w-60 w-full">
            <FaBars onClick={handleOpenResponsiveSideBar} className={`${theme === 'dark' ? 'text-white' : 'text-black'} flex lg:hidden absolute top-6 left-4 cursor-pointer`} />
            <div className={`sideBar transition-all duration-500 z-50 lg:z-0 fixed top-0 -left-full lg:left-0 ${theme === 'dark' ? 'bg-[#202020] text-white' : 'bg-white'} flex-1 flex flex-col justify-between h-screen max-w-60 border-r border-gray-300 w-full p-4`}>
                <Logo link="/system" color={`${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                <FaTimes onClick={handleCloseResponsiveSideBar} className="flex lg:hidden absolute top-6 right-2 cursor-pointer transition-all duration-500 hover:text-orange-500" />

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <FaChartBar />
                        <Link onClick={isMobile ? handleCloseResponsiveSideBar : undefined} href="/system" className="transition-all duration-500 hover:text-orange-500">Painel</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaUtensils />
                        <Link onClick={isMobile ? handleCloseResponsiveSideBar : undefined} href="/system/restaurantAdmin" className="transition-all duration-500 hover:text-orange-500">Restaurante</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClipboardList />
                        <Link onClick={isMobile ? handleCloseResponsiveSideBar : undefined} href="/system/ordersAdmin" className="transition-all duration-500 hover:text-orange-500">Pedidos</Link>
                    </div>
                </div>
                <div onClick={handleSignOut} className="cursor-pointer flex items-center gap-3">
                    <FaSignOutAlt />
                    <h6 className="transition-all duration-500 hover:text-orange-500">Sair</h6>
                </div>
            </div>
        </div>
    )
}