import Image from "next/image";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export function Products() {
    return (
        <>
            <div className="col-span-2">
                <h2 className="font-bold text-xl">Gerenciar produtos</h2>
                <div className="mt-7 flex gap-9 flex-wrap">
                    <div className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                        <Image className="w-20 h-20 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                        <div className="flex flex-col gap-1">
                            <h5 className="font-bold">Cheddar Burguer</h5>
                            <h6 className="font-bold text-sm">R$:18,90</h6>
                            <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">Lorem ipsum is simply dummy about the industry of the burguers.</p>
                            <div className="flex gap-3">
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-green-300 hover:border-none">
                                    <FaPencilAlt className="text-green-600 text-sm flex-shrink-0" />
                                </div>
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-red-300 hover:border-none">
                                    <FaTrashAlt className="text-red-600 text-sm flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                        <Image className="w-20 h-20 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                        <div className="flex flex-col gap-1">
                            <h5 className="font-bold">Cheddar Burguer</h5>
                            <h6 className="font-bold text-sm">R$:18,90</h6>
                            <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">Lorem ipsum is simply dummy about the industry of the burguers.</p>
                            <div className="flex gap-3">
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-green-300 hover:border-none">
                                    <FaPencilAlt className="text-green-600 text-sm flex-shrink-0" />
                                </div>
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-red-300 hover:border-none">
                                    <FaTrashAlt className="text-red-600 text-sm flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                        <Image className="w-20 h-20 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                        <div className="flex flex-col gap-1">
                            <h5 className="font-bold">Cheddar Burguer</h5>
                            <h6 className="font-bold text-sm">R$:18,90</h6>
                            <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">Lorem ipsum is simply dummy about the industry of the burguers.</p>
                            <div className="flex gap-3">
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-green-300 hover:border-none">
                                    <FaPencilAlt className="text-green-600 text-sm flex-shrink-0" />
                                </div>
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-red-300 hover:border-none">
                                    <FaTrashAlt className="text-red-600 text-sm flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                        <Image className="w-20 h-20 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                        <div className="flex flex-col gap-1">
                            <h5 className="font-bold">Cheddar Burguer</h5>
                            <h6 className="font-bold text-sm">R$:18,90</h6>
                            <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">Lorem ipsum is simply dummy about the industry of the burguers.</p>
                            <div className="flex gap-3">
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-green-300 hover:border-none">
                                    <FaPencilAlt className="text-green-600 text-sm flex-shrink-0" />
                                </div>
                                <div className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-red-300 hover:border-none">
                                    <FaTrashAlt className="text-red-600 text-sm flex-shrink-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="button max-w-56 mt-7 w-full">+Adicionar novo produto</button>
            </div>
            
        </>
    )
}