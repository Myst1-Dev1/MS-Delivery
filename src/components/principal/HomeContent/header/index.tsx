import { useGSAP } from "@gsap/react";
import { Logo } from "../../Header/Logo";
import { Dispatch, SetStateAction } from "react";
import gsap from "gsap";

interface HeaderProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>
    setHaveAccount:any;
}

export function Header({ setOpenModal, setHaveAccount }:HeaderProps) {

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { stagger:0.4, duration:0.4, ease:'power1.inOut' }});

        tl.fromTo('.header-line', { width:0 }, { width:'100%', duration:0.8, delay:0.3 });
        tl.fromTo('.logo', { opacity:0, x:-100 }, { opacity:1, x:0 });
        tl.fromTo('.createAcc', { opacity:0, x:-100 }, { opacity:1, x:0 });
        tl.fromTo(
            '.enter',
            {
            opacity: 0,
            scale: 1.5,
            filter: 'blur(10px)',
            },
            {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            }
        );
    }, []);

    return (
        <>
            <header className="lg:px-16 px-4 py-4 w-full flex justify-between items-center">
                <Logo link="/" />
                <div className="flex gap-5 items-center">
                    <span onClick={() => {setOpenModal(true); setHaveAccount('register');}} className="createAcc text-sm lg:text-xl text-orange-400 font-bold cursor-pointer transition-all duration-500 hover:brightness-90">Criar conta</span>
                    <button onClick={() => {setOpenModal(true); setHaveAccount('login');}} className="enter button p-2">Entrar</button>
                </div>
            </header>
            <hr className="header-line border-0 h-[1px] bg-gray-200 w-0" />
        </>
    )
}