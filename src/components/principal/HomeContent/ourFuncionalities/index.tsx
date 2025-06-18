import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from "next/image"
import { FaChartLine, FaClock, FaShoppingCart } from "react-icons/fa"
import { FaChartBar, FaCube, FaRocketchat, FaStar } from "react-icons/fa6"

export function OurFuncionalities() {

    useGSAP(() => {
        ScrollTrigger.create({
            trigger:'#ourFuncionalities',
            start:'top 90%',
            once:true,
            onEnter:() => {
                const tl = gsap.timeline({defaults:{ stagger:0.4, duration:0.4, ease:'sine' }});

                tl.fromTo('.our-text', { opacity:0, y:50 }, { opacity:1, y:0 });
                tl.fromTo('.our-box', { opacity:0, scale:1.4 }, { opacity:1, scale:1 });
                tl.fromTo('.ourImg', { opacity:0, x:100 }, { opacity:1, x:0 });
            }
        });
    }, []);

    return (
        <>
            <div id="ourFuncionalities">
                <h2 className="our-text text-2xl text-center font-bold">Nossas funcionalidades</h2>
                <div className="mt-10 flex justify-evenly items-center flex-wrap lg:gap-0 gap-10">
                    <div className="flex flex-col gap-3 max-w-md w-full">
                        <h3 className="our-text text-xl font-bold">Para o cliente</h3>
                        <p className="our-text">Nossa plataforma foi desenvolvida para oferecer praticidade, acompanhamento em tempo real e comunicação direta com o restaurante.</p>
                        <p className="our-text">Confira abaixo as funcionalidades disponíveis para o cliente:</p>
                        <div className="flex flex-col gap-2">
                            <div className="our-box flex items-center gap-3">
                                <FaShoppingCart className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Visualizar restaurantes e fazer pedidos
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaClock className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Acompanhar status do pedido em tempo real
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaStar className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Avaliar o pedido
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaRocketchat className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Conversar com o restaurante via chat.
                            </div>
                        </div>
                    </div>
                    <Image className="ourImg" src="/images/client-funcionality.webp" width={400} height={400} alt="foto de funcionalidades do cliente" />
                </div>
                <div className="mt-10 flex justify-evenly items-center flex-wrap lg:gap-0 gap-10">
                    <Image className="ourImg" src="/images/restaurant-funcionality.webp" width={400} height={400} alt="foto de funcionalidades do restaurante" />
                    <div className="flex flex-col gap-3 max-w-md w-full">
                        <h3 className="our-text text-xl font-bold">Para o restaurante</h3>
                        <p className="our-text">
                            Nossa plataforma ajuda restaurantes a gerenciar pedidos com agilidade, oferecendo controle das operações em tempo real. <br /> Com um painel completo, é possível acompanhar vendas, atualizar status e se comunicar com seus clientes de forma prática.
                        </p>
                        <p className="our-text">Veja abaixo as funcionalidades do restaurante:</p>
                        <div className="flex flex-col gap-2">
                            <div className="our-box flex items-center gap-3">
                                <FaChartBar className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Painel de administração completo
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaCube className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Gerenciar pratos, pedidos e vendas
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaChartLine className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Atualizar status de pedidos
                            </div>
                            <div className="our-box flex items-center gap-3">
                                <FaRocketchat className="stroke-2 text-xl stroke-orange-600 fill-none" />
                                Comunicação direta com o cliente
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}