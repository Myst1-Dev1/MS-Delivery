'use client';

import { Logo } from "@/components/principal/Header/Logo";
import gsap from "gsap";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { FaBars, FaChartBar, FaClipboardList, FaSignOutAlt, FaTimes, FaUtensils } from "react-icons/fa";

export function SideBar() {

    function handleOpenResponsiveSideBar() {
        gsap.fromTo('.sideBar', { left:"-100%" }, { left:0, duration:0.4, ease:'power1.inOut' })
    }

    function handleCloseResponsiveSideBar() {
        gsap.fromTo('.sideBar', { left:0 }, { left:"-100%", duration:0.4, ease:'power1.inOut' })
    }

    async function handleSignOut() {
        await signOut();
        destroyCookie(null, 'user');
    }

    return (
        <div className="max-w-0 lg:max-w-60 w-full">
            <FaBars onClick={handleOpenResponsiveSideBar} className="flex lg:hidden absolute top-6 left-4 cursor-pointer" />
            <div className="sideBar z-50 lg:z-0 fixed top-0 -left-full lg:left-0 bg-white flex-1 flex flex-col justify-between h-screen max-w-60 border-r border-gray-300 w-full p-4">
                <Logo />
                <FaTimes onClick={handleCloseResponsiveSideBar} className="flex lg:hidden absolute top-6 right-2" />

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <FaChartBar />
                        <Link href="/system" className="transition-all duration-500 hover:text-orange-500">Painel</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaUtensils />
                        <Link href="/system/restaurantAdmin" className="transition-all duration-500 hover:text-orange-500">Restaurante</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClipboardList />
                        <Link href="/system/ordersAdmin" className="transition-all duration-500 hover:text-orange-500">Pedidos</Link>
                    </div>
                </div>
                <div className="cursor-pointer flex items-center gap-3">
                    <FaSignOutAlt />
                    <h6 onClick={handleSignOut} className="transition-all duration-500 hover:text-orange-500">Sair</h6>
                </div>
            </div>
        </div>
    )
}