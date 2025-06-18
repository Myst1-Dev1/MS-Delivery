import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SystemFuncionalities() {
    
    useGSAP(() => {
        ScrollTrigger.create({
            trigger:'#systemFuncionalities',
            start:'top 90%',
            once:true,
            onEnter:() => {
                const tl = gsap.timeline({defaults:{ stagger:0.4, duration:0.6, ease:'sine' }});

                tl.fromTo('.sg-title', { opacity:0, y:50 }, { opacity:1, y:0 });
                tl.fromTo('.sf-box', { opacity:0, scale:1.4, filter:'blur(10px)', height:0 }, { opacity:1, scale:1, filter:'blur(0px)', height:'100%' });
            }
        });
    }, []);
    
    return (
        <>
            <div id="systemFuncionalities">
                <h2 className="text-2xl text-center font-bold">Como O Nosso Sistema Funciona</h2>
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 lg:gap-0 gap-6">
                    <div className="sf-box m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 group hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/createYourOwnRestaurant.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="sf-title text-xl font-bold">Crie o seu próprio restaurante</h3>
                        <p className="mt-2 text-gray-600 group-hover:text-white">
                            Escolha o tipo de conta: restaurante ou cliente. Selecione 'restaurante' para criar o seu negócio e gerenciar pratos, vendas e pedidos.
                        </p>
                    </div>
                    <div className="sf-box m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 group hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/adminOrders.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="text-xl font-bold">Receba e gerencie pedidos</h3>
                        <p className="mt-2 text-gray-600 group-hover:text-white">
                            Tenha controle total sobre cada pedido recebido. Aceite recuse ou conclua diretamente pelo painel de administração.
                        </p>
                    </div>
                    <div className="sf-box m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 group hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/chatWithClient.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="text-xl font-bold">Converse com seus clientes</h3>
                        <p className="mt-2 text-gray-600 group-hover:text-white">
                            Use o chat em tempo real para tirar dúvidas e manter o contato com seus clientes durante o pedido.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}