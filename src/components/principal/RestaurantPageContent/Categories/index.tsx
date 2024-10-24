import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaRocketchat } from "react-icons/fa";

export function Categories() {
    const [open, setOpen] = useState(false);

    useGSAP(() => {
        gsap.fromTo(".categories", { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' });
    }, []);

    return (
        <>
            <div className="categories flex w-full flex-col lg:flex-row justify-between lg:gap-0 gap-8 mt-7 m-auto">
                <div className="flex flex-col gap-2">
                    <h6 className="cursor-pointer font-bold">Entradas clássicas</h6>
                    <h6 className="cursor-pointer font-bold text-orange-500">Artesanais</h6>
                    <h6 className="cursor-pointer font-bold">Batatas</h6>
                    <h6 className="cursor-pointer font-bold">Bebidas</h6>
                </div>
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">Artesanais</h2>
                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        <div onClick={() => setOpen(true)} className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                            <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-2">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h6 className="font-bold text-sm">R$:14,90</h6>
                                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={open} setOpen={setOpen}>
                <div>
                    <Image className="w-full object-cover h-48 object-center" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="imagem do lanche" />
                    <div className="px-5 py-3 flex flex-col gap-4 overflow-y-scroll scrollDontShow h-96">
                        <Dialog.Title className="text-2xl font-bold">Cheddar Burguer</Dialog.Title>
                        <h5 className="font-bold text-xl">R$:14,90</h5>
                        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates blanditiis odit ad ut ex quas laborum nemo est, fuga id doloribus ipsa officia unde tempora, autem similique temporibus assumenda animi!</p>
                        <div className="flex flex-col gap-4">
                            <div className="border-b border-gray-200 pb-2 flex justify-between items-center w-full">
                                <div className="flex flex-col gap-1">
                                    <h6>Bacon</h6>
                                    <h6>+ R$:4,00</h6>
                                </div>
                                <div className="border border-gray-300 p-1 flex items-center gap-3">
                                    <FaMinus className="text-orange-400 cursor-pointer text-sm" />
                                    <span>1</span>
                                    <FaPlus className="text-orange-400 cursor-pointer text-sm" />
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-2 flex justify-between items-center w-full">
                                <div className="flex flex-col gap-1">
                                    <h6>Ovo</h6>
                                    <h6>+ R$:2,00</h6>
                                </div>
                                <div className="border border-gray-300 p-1 flex items-center gap-3">
                                    <FaMinus className="text-orange-400 cursor-pointer text-sm" />
                                    <span>1</span>
                                    <FaPlus className="text-orange-400 cursor-pointer text-sm" />
                                </div>
                            </div>
                            <div className="border-b border-gray-200 pb-2 flex justify-between items-center w-full">
                                <div className="flex flex-col gap-1">
                                    <h6>Catupiry</h6>
                                    <h6>+ R$:4,00</h6>
                                </div>
                                <div className="border border-gray-300 p-1 flex items-center gap-3">
                                    <FaMinus className="text-orange-400 cursor-pointer text-sm" />
                                    <span>1</span>
                                    <FaPlus className="text-orange-400 cursor-pointer text-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <FaRocketchat />
                                <h6>Alguma observação?</h6>
                            </div>
                            <textarea className="w-full rounded-md resize-none outline-none border border-gray-300 p-3 h-20" placeholder="Sem alface, carne ao ponto, etc"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <FaMinus className="text-gray-400 cursor-pointer" />
                                <span>1</span>
                                <FaPlus className="text-orange-400 cursor-pointer" />
                            </div>
                            <button className="max-w-60 bg-orange-500 text-white p-2 w-full rounded-md flex justify-between items-center font-bold transition-all duration-500 hover:bg-orange-600">Adicionar <span>R$:14,90</span></button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}