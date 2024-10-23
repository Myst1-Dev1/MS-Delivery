import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function About() {
    
    useGSAP(() => {
        gsap.fromTo(".about", { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' });
    }, []);

    return (
        <>
            <div className="about m-auto mt-7">
                <h2 className="font-bold text-xl">Sobre o restaurante</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, cum facilis at corporis repudiandae quaerat, reiciendis quis ad dolore quo cumque dolorum nihil officia voluptatibus blanditiis beatae inventore nesciunt temporibus!</p>
            </div>
        </>
    )
}