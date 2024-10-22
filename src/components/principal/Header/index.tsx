import Link from "next/link";
import { CiForkAndKnife } from "react-icons/ci";

export function Header() {
    return (
        <header className="px-4 lg:px-16 py-6 flex justify-between items-center w-full">
            <div className="flex gap-3 items-center">
                <h1 className="font-bold text-xl lg:text-2xl"><span className="text-orange-500">MS</span> Delivery</h1>
                <CiForkAndKnife className="text-orange-500 text-xl" />
            </div>
            <div className="flex gap-5 items-center">
                <Link href=""><button className="p-3 border border-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-500 hover:text-white">Login</button></Link>
                <Link href=""><button className="p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Cadastro</button></Link>
            </div>
        </header>
    )
}