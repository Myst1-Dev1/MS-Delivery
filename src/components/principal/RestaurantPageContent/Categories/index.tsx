import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaRocketchat, FaTimes } from "react-icons/fa";
import { Category, FoodType } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";

interface CategoriesProps {
    data: Category[];
    type:any;
}

export function Categories({ data, type }: CategoriesProps) {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(type?.foodType?.[0]?.type || null);
    const [selectedItem, setSelectedItem] = useState<null | any>(null);

    const filteredData = selectedType
        ? data.filter(dataItem => dataItem.categoryTitle === selectedType)
        : data;

    useGSAP(() => {
        gsap.fromTo(".categories", { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' });
    }, []);

    useGSAP(() => {
        gsap.fromTo('.food-box', { opacity:0, y:100 }, { opacity:1, y:0, duration:0.4, ease:'power1.inOut' })
    }, [selectedType])

    return (
        <>
            <div className="categories flex w-full flex-col lg:flex-row justify-between lg:gap-0 gap-8 mt-7 m-auto">
                <div className="flex flex-col gap-2">
                    {type?.foodType?.map((typeItem:any) => (
                        <h6 onClick={() => setSelectedType(typeItem.type)} className={`${selectedType === typeItem.type ? 'text-orange-500' : ''} cursor-pointer font-bold transition-all duration-500 hover:text-orange-500`} key={typeItem.type}>
                            {typeItem.type}
                        </h6>
                    ))}
                </div>
                    <div>
                        <div className="food-box flex flex-col">
                            <h2 className="font-bold text-xl">{selectedType}</h2>
                            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                                {filteredData.length === 0 ? 
                                    <div>
                                        <span>Sem itens para esse tipo 😢</span>
                                    </div> 
                                    : filteredData.map((data, index) => (
                                    <div key={index}>
                                        <div  onClick={() => setSelectedItem(data)}  className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white">
                                            <Image className="w-20 h-28 rounded-md object-cover" src={data.image.url} width={500} height={500} alt="foto do alimento" />
                                            <div className="flex flex-col gap-2">
                                                <h5 className="font-bold">{data.name}</h5>
                                                <h6 className="font-bold text-sm">{FormatPrice(data.price)}</h6>
                                                <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">{data.description}</p>
                                                <div className="cursor-pointer w-5 h-5 flex justify-center items-center p-2 border border-black font-bold transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"><FaPlus className="flex-shrink-0 text-xs" /></div>
                                            </div>
                                        </div>
                                        {selectedItem && (
                                        <Modal open={!!selectedItem} setOpen={() => setSelectedItem(null)}>
                                            <div className="min-h-screen lg:h-[576px]">
                                                <div onClick={() => setSelectedItem(null)} className="cursor-pointer bg-white rounded-full w-10 h-10 flex justify-center items-center absolute top-[18.5rem] lg:top-2 right-2 transition-all duration-500 hover:bg-orange-600 hover:text-white"><FaTimes /></div>
                                                <Image className="mt-60 lg:mt-0 w-full object-contain lg:object-cover h-80 lg:h-48 object-center" src={selectedItem.image.url} width={500} height={500} alt="imagem do lanche" />
                                                <div className="px-5 py-3 flex flex-col gap-4 overflow-y-scroll scrollDontShow h-screen lg:h-96">
                                                    <Dialog.Title className="text-2xl font-bold">{selectedItem.name}</Dialog.Title>
                                                    <h5 className="font-bold text-xl">{FormatPrice(selectedItem.price)}</h5>
                                                    <p className="text-gray-500 text-sm">{selectedItem.description}</p>
                                                    <div className="flex flex-col gap-4">
                                                        {selectedItem.additionals.flatMap((additionalGroup:any) =>
                                                            additionalGroup.Additionals.map((additional:any) => (
                                                                <div className="border-b border-gray-200 pb-2 flex justify-between items-center w-full" key={additional.additionalName}>
                                                                    <div className="flex flex-col gap-1">
                                                                        <h6>{additional.additionalName}</h6>
                                                                        <h6>{FormatPrice(additional.additionalPrice)}</h6>
                                                                    </div>
                                                                    <div className="border border-gray-300 p-1 flex items-center gap-3">
                                                                        <FaMinus className="text-orange-400 cursor-pointer text-sm" />
                                                                        <span>1</span>
                                                                        <FaPlus className="text-orange-400 cursor-pointer text-sm" />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <FaRocketchat />
                                                            <h6>Alguma observação?</h6>
                                                        </div>
                                                        <textarea className="w-full rounded-md resize-none outline-none border border-gray-300 p-3 h-20" placeholder="Sem alface, carne ao ponto, etc" />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <FaMinus className="text-gray-400 cursor-pointer" />
                                                            <span>1</span>
                                                            <FaPlus className="text-orange-400 cursor-pointer" />
                                                        </div>
                                                        <button className="max-w-60 bg-orange-500 text-white p-2 w-full rounded-md flex justify-between items-center font-bold transition-all duration-500 hover:bg-orange-600">
                                                            Adicionar <span>{FormatPrice(selectedItem.price)}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                   
            </div>
        </>
    )
}