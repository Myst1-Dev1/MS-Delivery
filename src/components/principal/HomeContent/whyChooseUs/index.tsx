import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from "gsap";

export function WhyChooseUs() {
    
    useGSAP(() => {
        ScrollTrigger.create({
            trigger:'#whyChooseUs',
            start:'top 90%',
            once:true,
            onEnter:() => {
                const tl = gsap.timeline({defaults:{ stagger:0.4, duration:0.8, ease:'sine' }});

                tl.fromTo('.whyImg', { opacity:0, x:50, scale:1.4 }, { opacity:1, x:0, scale:1 });
                tl.fromTo('.whyText', { opacity:0, y:40 }, { opacity:1, y:0 });
            
                gsap.utils.toArray('.counter').forEach((el: any) => {
                const finalValue = parseInt(el.dataset.value);
                
                gsap.fromTo(el, 
                    { innerText: 0 },
                    {
                    innerText: finalValue,
                    duration: 2,
                    delay:0.6,
                    ease: 'power1.out',
                    snap: { innerText: 1 },
                    onUpdate: () => {
                        el.innerText = `${Math.floor(Number(el.innerText))}${finalValue >= 100 ? '+' : ''}`;
                    }
                    }
                );
                });
            }
        });
    }, []);
    
    return (
        <>
            <div id="whyChooseUs" className="py-8 flex gap-5 lg:gap-0 flex-col-reverse lg:flex-row items-center flex-wrap justify-evenly">
                <Image className="whyImg" src="/images/whyChoose.webp" width={400} height={400} alt="imagem de porque nos escolher" />
                <div className="max-w-md w-full flex flex-col gap-3">
                    <h2 className="whyText text-2xl lg:text-4xl font-bold text-orange-500">Por que nos <br /> escolher</h2>
                    <p className="whyText">Oferecemos um serviço de entrega rápido, confiável e eficiente para restaurantes e clientes.</p>
                    <p className="whyText">Nossa plataforma é facil de usar e fornece uma comunicação transparente durante todo o processo.</p>
                    <div className="flex flex-wrap gap-10">
                        <div className="w-fit">
                            <h5 className="text-sm lg:text-xl font-bold">Clientes satisfeitos</h5>
                            <h6 className="counter text-xl lg:text-2xl font-bold text-orange-500" data-value="300">300+</h6>
                        </div>
                        <div className="w-fit">
                            <h5 className="text-sm lg:text-xl font-bold">Anos de serviço</h5>
                            <h6 className="counter text-xl lg:text-2xl font-bold text-orange-500" data-value="2">2</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}