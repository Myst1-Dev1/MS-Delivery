import { Logo } from "@/components/principal/Header/Logo";
import Link from "next/link";
import { FaChartBar, FaClipboardList, FaSignOutAlt, FaUtensils } from "react-icons/fa";

export function SideBar() {
    return (
        <div className="max-w-60 w-full">
            <div className="fixed top-0 left-0 bg-white flex-1 flex flex-col justify-between h-screen max-w-60 border-r border-gray-300 w-full p-4">
                <Logo />

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
                <div className="flex items-center gap-3">
                    <FaSignOutAlt />
                    <h6 className="transition-all duration-500 hover:text-orange-500">Sair</h6>
                </div>
            </div>
        </div>
    )
}