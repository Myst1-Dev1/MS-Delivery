'use client';

import Image from "next/image";
import { Header } from "./header";
import { Funcionalities } from "./funcionalities";
import { WhyChooseUs } from "./whyChooseUs";
import { Testimonials } from "./testimonials";

export default function HomeContent() {

    return (
        <>
            <Header />
            <main className="py-16 px-4 lg:px-16 flex flex-col gap-16">
                <div className="flex justify-between items-center flex-wrap lg:gap-0 gap-8">
                <div className="max-w-lg w-full">
                    <h1 className="text-2xl lg:text-4xl font-bold">
                    Tenha seu restaurante online <br /> com o <span className="text-orange-500">MS</span> Delivery
                    </h1>
                    <p className="text-gray-600 mt-3">
                        Facilite a gestão do seu restaurante e otimize suas operações com o MS Delivery, a solução completa para o seu negócio.
                    </p>
                    <button className="button mt-3">Saiba mais</button>
                </div>
                <Image src="/images/home-banner.webp" width={600} height={600} alt="foto de um entregador" />
                </div>
                <Funcionalities />
                <WhyChooseUs />
                <Testimonials />
            </main>
        </>
    )
}