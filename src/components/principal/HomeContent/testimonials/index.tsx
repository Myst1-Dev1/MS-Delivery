import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Testimonials() {
    const [selected, setSelected] = useState(0);

    const testimonials = [
    {
      name: "Diana Johnston",
      date: "29 Ago, 2017",
      rating: 4.9,
      image: "/images/diana.jpg",
      comment:
        "Experiência geral muito agradável. Pague um pouco antes e um pouco durante o desenvolvimento do app conforme os marcos são atingidos, o que me fez sentir muito confiante e confortável. Processo simples e tranquilo.",
    },
    {
      name: "Edward Alexander",
      date: "29 Ago, 2017",
      rating: 4.9,
      image: "/images/edward.jpg",
      comment:
      "O suporte foi excelente e a comunicação durante o desenvolvimento foi clara e constante. Senti que minhas ideias foram bem compreendidas e aplicadas no projeto final."
    },
    {
      name: "Lauren Contreras",
      date: "29 Ago, 2017",
      rating: 4.9,
      image: "/images/lauren.jpg",
      comment:
      "A plataforma é muito intuitiva e me ajudou a agilizar meu atendimento ao cliente. Fiquei impressionada com a eficiência da entrega e a atenção aos detalhes."
    },
    ];

    useGSAP(() => {
        ScrollTrigger.create({
            trigger:'#testimonials',
            start:'top 90%',
            once:true,
            onEnter:() => {
                const tl = gsap.timeline({defaults:{ stagger:0.4, duration:0.4, ease:'sine' }});

                tl.fromTo('.ts-text', { opacity:0, y:40 }, { opacity:1, y:0 });
                tl.fromTo('.avatar', { opacity:0, x:-80 }, { opacity:1, x:0 });
                tl.fromTo('.ts-comment', { opacity:0, y:50 }, { opacity:1, y:0 });
            }
        });
    }, []);

    return (
        <>
            <div id="testimonials" className="py-16">
                <h2 className="ts-text text-2xl text-center font-bold">O que os nossos clientes satisfeitos dizem</h2>
                 <div className="mt-20 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">
                    <div className="flex flex-col items-start gap-6 w-full lg:w-1/3">
                        {testimonials.map((person, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                className="avatar flex items-center gap-4 text-left focus:outline-none"
                                >
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className={`w-14 h-14 rounded-full object-cover transition-all duration-300 ${
                                    index === selected ? "ring-2 ring-orange-500" : "opacity-70"
                                    }`}
                                />
                                <div>
                                    <p className="font-semibold">{person.name}</p>
                                    <p className="text-sm text-gray-500">
                                    ⭐ {person.rating} em {person.date}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="ts-comment w-full lg:w-2/3 transition-all duration-300">
                        <blockquote className="text-gray-600 italic text-lg border-l-4 pl-4 border-orange-500">
                            “{testimonials[selected].comment}”
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    )
}