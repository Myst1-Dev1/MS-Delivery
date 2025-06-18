'use client';

import Image from "next/image";
import { Header } from "./header";
import { SystemFuncionalities } from "./systemFuncionalities";
import { WhyChooseUs } from "./whyChooseUs";
import { Testimonials } from "./testimonials";
import { useState } from "react";
import { SignModal } from "./signModal";
import { OurFuncionalities } from "./ourFuncionalities";
import { CallToAction } from "./callToAction";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeContent() {
    const [openModal, setOpenModal] = useState(false);
    const [haveAccount, setHaveAccount] = useState('login');

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { stagger:0.4, duration:0.6, ease:'sine' }});

        tl.fromTo('.bn-title', { opacity:0, y:100 }, { opacity:1, y:0 });
        tl.fromTo('.bn-description', { opacity:0, y:100 }, { opacity:1, y:0 });
        tl.fromTo('.bn-button', { opacity:0, scale:2 }, { opacity:1, scale:1 });
        tl.fromTo('.bn-img', { opacity:0, y:100, filter: 'blur(20px)' }, { opacity:1, y:0, filter: 'blur(0px)', duration: 0.6 });
    }, []);

    return (
        <>
            <Header setOpenModal={setOpenModal} setHaveAccount={setHaveAccount} />
            <main className="py-16 px-4 lg:px-16 flex flex-col gap-16">
                <div className="flex justify-between items-center flex-wrap lg:gap-0 gap-8">
                    <div className="max-w-lg w-full">
                        <h1 className="bn-title text-2xl lg:text-4xl font-bold">
                        Tenha seu restaurante online <br /> com o <span className="text-orange-500">MS</span> Delivery
                        </h1>
                        <p className="bn-description text-gray-600 mt-3">
                            Facilite a gestão do seu restaurante e otimize suas operações com o MS Delivery, a solução completa para o seu negócio.
                        </p>
                        <Link href="#cta">
                            <button className="bn-button button mt-3">Saiba mais</button>
                        </Link>
                    </div>
                    <Image className="bn-img" src="/images/home-banner.webp" width={600} height={600} alt="foto de um entregador" />
                </div>
                <SystemFuncionalities />
                <WhyChooseUs />
                <OurFuncionalities />
                <Testimonials />
                <CallToAction setHaveAccount={setHaveAccount} setOpenModal={setOpenModal} />
                <SignModal openModal={openModal} setOpenModal={setOpenModal} haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
            </main>
            <p className="py-8 border-t border-orange-200 text-center">
                ©2025 Desenvolvido por <Link href="https://www.mystdev.com.br/" target="_blank" rel="noopener noreferrer" className="text-orange-100 transition-all duration-500 hover:text-orange-600">Myst1 Dev</Link>
            </p>
        </>
    )
}