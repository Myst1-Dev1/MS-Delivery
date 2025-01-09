import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

export function UserBox() {
    return (
        <>
            <div className="user-box h-0 hidden opacity-0 max-w-80 p-3 bg-white rounded-lg absolute top-20 right-6 border border-[#ededed]">
                <h5 className="font-bold mb-3">Minha Conta</h5>
                <div className="flex flex-col gap-3">
                    <Link className="transition-all duration-500 hover:text-orange-500" href="">Perfil</Link>
                    {/* <Link className="transition-all duration-500 hover:text-orange-500" href="">Pedidos</Link> */}
                    <Link className="transition-all duration-500 hover:text-orange-500" href="/createRestaurant">Criar Restaurante</Link>
                    <button onClick={() => signOut()} className="flex items-center gap-2 transition-all duration-500 hover:text-orange-500"><FaSignOutAlt /> Sair</button>
                </div>
            </div>
        </>
    )
}