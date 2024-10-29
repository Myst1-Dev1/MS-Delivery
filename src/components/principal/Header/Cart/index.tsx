import Image from "next/image";
import { FaTimes } from "react-icons/fa";


export function Cart() {
    return (
        <>
            <div className="cart opacity-0 hidden h-[500px] bg-white max-w-80 absolute top-20 right-0 w-full p-3 rounded-lg border border-[#ededed]">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <h5 className="text-xl font-bold">Carrinho</h5>
                        <h6 className="mt-3 font-bold">Meu pedido</h6>
                        <div className="mt-5 flex flex-col overflow-y-scroll scrollDontShow h-60 gap-4">
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-3">
                                    <Image className="w-20 h-20 object-cover rounded-md" src='/images/cheddar-burguer.jpg' width={500} height={500} alt="foto do item no pedido" />
                                    <div className="flex flex-col gap-2">
                                        <h6>Cheddar Burguer</h6>
                                        <h5 className="font-bold text-xl">R$:14,90</h5>
                                    </div>
                                </div>
                                <FaTimes className="cursor-pointer text-red-600" />
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-3">
                                    <Image className="w-20 h-20 object-cover rounded-md" src='/images/cheddar-burguer.jpg' width={500} height={500} alt="foto do item no pedido" />
                                    <div className="flex flex-col gap-2">
                                        <h6>Cheddar Burguer</h6>
                                        <h5 className="font-bold text-xl">R$:14,90</h5>
                                    </div>
                                </div>
                                <FaTimes className="cursor-pointer text-red-600" />
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-3">
                                    <Image className="w-20 h-20 object-cover rounded-md" src='/images/cheddar-burguer.jpg' width={500} height={500} alt="foto do item no pedido" />
                                    <div className="flex flex-col gap-2">
                                        <h6>Cheddar Burguer</h6>
                                        <h5 className="font-bold text-xl">R$:14,90</h5>
                                    </div>
                                </div>
                                <FaTimes className="cursor-pointer text-red-600" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-300">
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold">Total</h6>
                            <h6 className="font-bold">R$:29,90</h6>
                        </div>
                        <button className="mt-4 font-bold bg-orange-500 text-white rounded-md p-3 w-full transition-all duration-500 hover:bg-orange-600">Fazer pedido</button>
                    </div>
                </div>
            </div>
        </>
    )
}