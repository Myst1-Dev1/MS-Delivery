import { api } from "@/services/axios";
import Link from "next/link";
import { destroyCookie } from "nookies";
import { FaClipboardList, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { IoMdPerson } from 'react-icons/io'

export function NavBar() {
    async function handleSignOut() {
        try {
            const res = await api.post('auth/logout', {}, {
                withCredentials: true
            });
            destroyCookie(null,'user-token');
            console.log('Logout success', res.data);
            
            window.location.href = '/';
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    }

    return (
        <>
            <nav className="flex flex-end fixed bottom-0 left-0 right-0 z-[9999]">
                <div className="border-t border-gray-300 bg-white transition-all duration-500 hover:bg-orange-500 hover:text-white cursor-pointer p-3 w-full flex flex-1 justify-center flex-col lg:flex-row items-center gap-3">
                    <IoMdPerson />
                    <Link href="">Perfil</Link>
                </div>
                <div className="border-t border-gray-300 bg-white transition-all duration-500 hover:bg-orange-500 hover:text-white cursor-pointer p-3 w-full flex flex-1 justify-center flex-col lg:flex-row items-center gap-3">
                    <FaSearch />
                    <span>Buscar</span>
                </div>
                <div className="border-t border-gray-300 bg-white transition-all duration-500 hover:bg-orange-500 hover:text-white cursor-pointer p-3 w-full flex flex-1 justify-center flex-col lg:flex-row items-center gap-3">
                    <FaClipboardList />
                    <Link href="">Pedidos</Link>
                </div>
                <div onClick={handleSignOut} className="border-t border-gray-300 bg-white transition-all duration-500 hover:bg-orange-500 hover:text-white cursor-pointer p-3 w-full flex flex-1 justify-center flex-col lg:flex-row items-center gap-3">
                    <FaSignOutAlt />
                    <span >Sair</span>
                </div>
            </nav>
        </>
    )
}