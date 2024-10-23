import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export function Testimonials() {
    
    useGSAP(() => {
        gsap.fromTo(".testimonial", { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' });
    }, []);

    return (
        <>
            <div className="testimonial flex w-full flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-between lg:gap-5 gap-8 mt-7 m-auto">
                <div className="lg:max-w-72 w-full border border-gray-300 h-fit rounded-md p-5">
                    <h3 className="font-bold text-xl">Faça uma avaliação</h3>
                    <form className="mt-4 flex flex-col gap-4">
                        <div className="flex gap-3">
                            <FaStar className="text-gray-400" />
                            <FaStar className="text-gray-400" />
                            <FaStar className="text-gray-400" />
                            <FaStar className="text-gray-400" />
                            <FaStar className="text-gray-400" />
                        </div>
                        <textarea className="resize-none outline-none p-3 rounded-md border border-gray-300 w-full h-32"></textarea>
                        <button className="bg-orange-500 p-3 w-full text-white rounded-md font-bold transition-all duration-500 hover:bg-orange-600">Enviar</button>
                    </form>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
                    <div className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                        <div className="flex items-center gap-4">
                            <Image className="w-14 h-14 rounded-full object-cover aspect-square" src="/images/user.jpg" width={50} height={50} alt="foto do usuário" />
                            <div className="flex flex-col gap-3">
                                <h6 className="font-bold">John Doe</h6>
                                <div className="flex gap-3">
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ratione pariatur, perspiciatis mollitia magnam incidunt aspernatur saepe facilis voluptatem doloribus ad eveniet enim soluta nemo amet laudantium doloremque magni praesentium.</p>
                    </div>
                    <div className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                        <div className="flex items-center gap-4">
                            <Image className="w-14 h-14 rounded-full object-cover aspect-square" src="/images/user.jpg" width={50} height={50} alt="foto do usuário" />
                            <div className="flex flex-col gap-3">
                                <h6 className="font-bold">John Doe</h6>
                                <div className="flex gap-3">
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ratione pariatur, perspiciatis mollitia magnam incidunt aspernatur saepe facilis voluptatem doloribus ad eveniet enim soluta nemo amet laudantium doloremque magni praesentium.</p>
                    </div>
                    <div className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                        <div className="flex items-center gap-4">
                            <Image className="w-14 h-14 rounded-full object-cover aspect-square" src="/images/user.jpg" width={50} height={50} alt="foto do usuário" />
                            <div className="flex flex-col gap-3">
                                <h6 className="font-bold">John Doe</h6>
                                <div className="flex gap-3">
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ratione pariatur, perspiciatis mollitia magnam incidunt aspernatur saepe facilis voluptatem doloribus ad eveniet enim soluta nemo amet laudantium doloremque magni praesentium.</p>
                    </div>
                    <div className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                        <div className="flex items-center gap-4">
                            <Image className="w-14 h-14 rounded-full object-cover aspect-square" src="/images/user.jpg" width={50} height={50} alt="foto do usuário" />
                            <div className="flex flex-col gap-3">
                                <h6 className="font-bold">John Doe</h6>
                                <div className="flex gap-3">
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                    <FaStar className="text-yellow-400" />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ratione pariatur, perspiciatis mollitia magnam incidunt aspernatur saepe facilis voluptatem doloribus ad eveniet enim soluta nemo amet laudantium doloremque magni praesentium.</p>
                    </div>
                </div>
            </div>
        </>
    )
}