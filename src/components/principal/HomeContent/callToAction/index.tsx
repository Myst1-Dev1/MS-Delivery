import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CallToActionProps {
    setHaveAccount:any;
    setOpenModal:any;
}

export function CallToAction({ setHaveAccount, setOpenModal }:CallToActionProps) {

    useGSAP(() => {
        ScrollTrigger.create({
            trigger:'#ourFuncionalities',
            start:'top 90%',
            once:true,
            onEnter:() => {
                const tl = gsap.timeline({defaults:{ stagger:0.4, duration:0.4, ease:'sine' }});

                tl.fromTo('.cta-text', { opacity:0, y:50 }, { opacity:1, y:0 });
                tl.fromTo('.cta-btn', { opacity:0, y:50, scale:1.4 }, { opacity:1, y:0, scale:1 });
                tl.fromTo('.ctaImg', { opacity:0, x:100 }, { opacity:1, x:0 });
            }
        });
    }, []);

    return (
        <>
            <div id="cta" className="flex items-center justify-evenly flex-wrap lg:gap-0 gap-8">
                <div className="max-w-md w-full">
                    <h2 className="cta-text text-xl lg:text-3xl font-bold">Crie seu delivery <br />agora mesmo</h2>
                    <div className="flex flex-col gap-3 mt-10">
                        <h3 className="cta-text font-bold text-xl">Tenha seu próprio sistema</h3>
                        <p className="cta-text">Crie uma conta e comece a gerenciarseu restaurante em poucos minutos</p>
                    </div>
                    <div className="flex flex-col gap-3 py-3">
                        <h3 className="cta-text font-bold text-xl">Controle total do seu negócio</h3>
                        <p className="cta-text">Gerencie pedidos: produtos, clientese vendas em um só lugar</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="cta-text font-bold text-xl">Simplifique sua operação</h3>
                        <p className="cta-text">Automatize o fluxo de pediso e ganhe tempocom uma plataforma pensada para o seu dia à dia</p>
                    </div>
                    <button onClick={() => { setOpenModal(true); setHaveAccount('register');}} className="cta-btn button mt-5">Começe agora</button>
                </div>
                <Image className="ctaImg" src="/images/ctaImg.webp" width={400} height={400} alt="imagem de call to action" />
            </div>
        </>
    )
}