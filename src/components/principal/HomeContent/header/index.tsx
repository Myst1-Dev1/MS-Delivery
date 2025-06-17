import { Logo } from "../../Header/Logo";

export function Header() {
    return (
        <>
            <header className="lg:px-16 px-4 py-4 w-full flex justify-between items-center">
                <Logo link="/" />
                <div className="flex gap-5 items-center">
                    <span className="text-sm lg:text-xl text-orange-400 font-bold cursor-pointer transition-all duration-500 hover:brightness-90">Criar conta</span>
                    <button className="button p-2">Entrar</button>
                </div>
            </header>
        </>
    )
}