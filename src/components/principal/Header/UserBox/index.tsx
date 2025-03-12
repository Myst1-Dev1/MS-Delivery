import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { api } from "@/services/axios";
import { destroyCookie } from "nookies";

export function UserBox() {

    async function handleSignOut() {
        try {
            destroyCookie(null, 'user-token', {
                path: '/',
            });
    
            await api.post("/auth/logout");
            
            window.location.href = '/';
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    }

    return (
        <>
            <div className="user-box h-0 hidden opacity-0 max-w-80 p-3 bg-white rounded-lg absolute top-20 right-6 border border-[#ededed]">
                <h5 className="font-bold mb-3">Minha Conta</h5>
                <div className="flex flex-col gap-3">
                    <Link className="transition-all duration-500 hover:text-orange-500" href="">Perfil</Link>
                    <Link className="transition-all duration-500 hover:text-orange-500" href="">Pedidos</Link>
                    <button onClick={handleSignOut} className="flex items-center gap-2 transition-all duration-500 hover:text-orange-500"><FaSignOutAlt /> Sair</button>
                </div>
            </div>
        </>
    )
}