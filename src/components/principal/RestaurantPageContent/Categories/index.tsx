import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaRocketchat, FaTimes } from "react-icons/fa";
import { Dishes } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";

interface CategoriesProps {
    options: String[];
    dishes: Dishes[];
}

export function Categories({ options, dishes }: CategoriesProps) {
    const [selectedType, setSelectedType] = useState<string | any>(() => options?.[0] || "");
    const [selectedItem, setSelectedItem] = useState<null | any>(null);
    const [quantity, setQuantity] = useState(1);

    const { handleAddToCart, handleObservationChange, observation } = useCart();

    const filteredData = selectedType
        ? dishes.filter(dishe => dishe.menuOption === selectedType)
        : dishes;

    function handleCart(id: string, data: Dishes[]) {
        handleAddToCart(id, data, quantity);
        
        setSelectedItem(null);
        setQuantity(1);
    }

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
                    {options?.map((option, index:number) => (
                        <h6 onClick={() => setSelectedType(option)} className={`${selectedType === option ? 'text-orange-500' : ''} cursor-pointer font-bold transition-all duration-500 hover:text-orange-500`} key={index}>
                            {option}
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
                                        <div onClick={() => setSelectedItem(data)}  className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2 cursor-pointer transition-all duration-500 hover:bg-orange-300 hover:text-white">
                                            <Image className="w-20 h-28 rounded-md object-cover" src={data.image} width={500} height={500} alt="foto do alimento" />
                                            <div className="flex flex-col gap-3">
                                                <h5 className="font-bold">{data.name}</h5>
                                                <h6 className="font-bold text-sm">{FormatPrice(data.price)}</h6>
                                                <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">{data.description}</p>
                                            </div>
                                        </div>
                                        {selectedItem && (
                                        <Modal open={!!selectedItem} setOpen={() => setSelectedItem(null)}>
                                            <div className="h-full lg:h-[576px] relative">
                                                <div onClick={() => setSelectedItem(null)} className="cursor-pointer bg-white rounded-full w-10 h-10 flex justify-center items-center absolute top-56 lg:-translate-y-[4px] -translate-y-[170px] lg:top-2 right-2 transition-all duration-500 hover:bg-orange-600 hover:text-white"><FaTimes /></div>
                                                <Image className="mt-44 lg:mt-0 w-full object-contain lg:object-cover lg:h-48 object-center" src={selectedItem.image} width={500} height={500} alt="imagem do lanche" />
                                                <div className="px-5 py-3 grid grid-cols-1 gap-4 overflow-y-scroll scrollDontShow h-screen lg:h-96">
                                                    <div className="flex flex-col gap-2">
                                                        <Dialog.Title className="text-2xl font-bold">{selectedItem.name}</Dialog.Title>
                                                        <h5 className="font-bold text-xl">{FormatPrice(selectedItem.price)}</h5>
                                                        <p className="text-gray-500 text-sm">{selectedItem.description}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex items-center gap-3">
                                                                <FaRocketchat />
                                                                <h6>Alguma observação?</h6>
                                                            </div>
                                                            <textarea value={observation} onChange={handleObservationChange} className="w-full rounded-md resize-none outline-none border border-gray-300 p-3 h-20" placeholder="Sem alface, carne ao ponto, etc" />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <FaMinus onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))} className="text-gray-400 cursor-pointer" />
                                                                <span>{quantity}</span>
                                                                <FaPlus onClick={() => setQuantity((prev) => prev + 1)} className="text-orange-400 cursor-pointer" />
                                                            </div>
                                                            <button onClick={() => handleCart(selectedItem.id, filteredData)} className="max-w-60 bg-orange-500 text-white p-2 w-full rounded-md flex justify-between items-center font-bold transition-all duration-500 hover:bg-orange-600">
                                                                Adicionar <span>{FormatPrice(selectedItem.price * quantity)}</span>
                                                            </button>
                                                        </div>
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