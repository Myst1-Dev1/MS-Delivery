import { handleSignOut } from "@/app/actions/AuthActions";
import Link from "next/link";


export function UserBox() {
    return (
        <>
            <div className="user-box h-0 hidden opacity-0 max-w-72 p-3 bg-white rounded-lg absolute top-20 right-6 border border-[#ededed]">
                <h5 className="font-bold mb-3">Minha Conta</h5>
                <div className="flex flex-col gap-3">
                    <Link className="transition-all duration-500 hover:text-orange-500" href="">Perfil</Link>
                    <Link className="transition-all duration-500 hover:text-orange-500" href="">Pedidos</Link>
                    <form action={handleSignOut}>
                        <button className="transition-all duration-500 hover:text-orange-500">Sair</button>
                    </form> 
                </div>
            </div>
        </>
    )
}