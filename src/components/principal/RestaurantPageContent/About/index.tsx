import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface AboutProps {
    about:string;
}

export function About({ about }: AboutProps) {
    
    useGSAP(() => {
        gsap.fromTo(".about", { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' });
    }, []);

    return (
        <>
            <div className="about m-auto mt-7">
                <h2 className="font-bold text-xl">Sobre o restaurante</h2>
                <p>{about}</p>
            </div>
        </>
    )
}