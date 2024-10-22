import Image from "next/image";
import { FaMapMarkerAlt, FaPlus, FaStar } from "react-icons/fa";

export default function RestaurantPage() {
    return (
        <>
            <div className="px-4 lg:px-16 py-10">
                <div className="bg-restaurant-bg bg-center w-full h-60 bg-cover rounded-md"></div>
                <div className="mt-5 flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Big Bang Burguer</h2>
                    <div className="flex gap-3 items-center">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-500">5.0 (3)</span>
                    </div>
                    <div className="flex gap-3 items-center text-gray-500">
                        <FaMapMarkerAlt />
                        <h6 className="font-bold">Rua Lorem da Silva Av 14, São John Doe, - RJD</h6>
                    </div>
                </div>

                <div className="mt-7 flex w-full flex-col lg:flex-row gap-16">
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#f4f1f1] max-w-72 justify-center w-full p-2 flex items-center gap-3">
                            <span className="cursor-pointer font-bold bg-orange-400 text-white p-2 text-sm transition-all duration-500 hover:bg-orange-700">Categorias</span>
                            <span className="cursor-pointer text-sm p-2 text-gray-500 font-bold transition-all duration-500 hover:bg-orange-400 hover:text-white">Sobre</span>
                            <span className="cursor-pointer text-sm p-2 text-gray-500 font-bold transition-all duration-500 hover:bg-orange-400 hover:text-white">Avaliações</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h6 className="cursor-pointer font-bold">Entradas clássicas</h6>
                            <h6 className="cursor-pointer font-bold text-orange-500">Artesanais</h6>
                            <h6 className="cursor-pointer font-bold">Batatas</h6>
                            <h6 className="cursor-pointer font-bold">Bebidas</h6>
                        </div>
                    </div>

                    <div className="m-auto">
                        <h2 className="font-bold text-xl">Artesanais</h2>
                        <div className="mt-7 grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 group hover:bg-orange-300 hover:text-white hover:border-none">
                                <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-bold">Cheddar Burguer</h5>
                                    <h6 className="font-bold text-sm">R$:14,90</h6>
                                    <p className="text-gray-500 text-sm group-hover:text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                    <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                                <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-bold">Cheddar Burguer</h5>
                                    <h6 className="font-bold text-sm">R$:14,90</h6>
                                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                    <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                                <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-bold">Cheddar Burguer</h5>
                                    <h6 className="font-bold text-sm">R$:14,90</h6>
                                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                    <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                                <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-bold">Cheddar Burguer</h5>
                                    <h6 className="font-bold text-sm">R$:14,90</h6>
                                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                    <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
                                <Image className="w-20 h-28 rounded-md object-cover" src="/images/cheddar-burguer.jpg" width={500} height={500} alt="foto do alimento" />
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-bold">Cheddar Burguer</h5>
                                    <h6 className="font-bold text-sm">R$:14,90</h6>
                                    <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                                    <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white hover:border-none">
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
            </div>
        </>
    )
}