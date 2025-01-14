'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import Image from "next/image";
import { FaCloudUploadAlt, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Category } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import { handleCurrency } from "@/utils/masks";

interface ProductsProps {
    foodType:[] | any;
    categorie:Category[];
}

export function Products({ foodType, categorie }:ProductsProps) {
    const [openProductModal, setOpenProductModal] = useState(false);

    return (
        <>
            <div className="col-span-2">
                <h2 className="font-bold text-xl">Gerenciar produtos</h2>
                <div className="mt-7 flex justify-between gap-9 flex-wrap">
                    {categorie.length === 0 ? 'Você ainda não tem produtos' : categorie.map(item => (
                        <div key={item.id} className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                            <Image className="w-20 h-20 rounded-md object-cover" src={item.image.url || '/images/cheddar-burguer.jpg'} width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-1">
                                <h5 className="font-bold">{item.name}</h5>
                                <h6 className="font-bold text-sm">{FormatPrice(item.price)}</h6>
                                <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
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
                    ))}
                </div>
                <div className="flex justify-end items-end">
                    <button onClick={() => setOpenProductModal(true)} className="button max-w-56 mt-7 w-full">+Adicionar novo produto</button>
                </div>
            </div>
            <Modal open={openProductModal} setOpen={setOpenProductModal}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Criar novo produto</Dialog.Title>
                <form action="" className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <Image className="w-[50px] h-[50px] object-cover" src="/images/uploadProduct.jpg" width={50} height={50} alt="imagem de upload do produto" />
                            <label htmlFor="product-image" className="cursor-pointer flex items-center gap-3">
                                <FaCloudUploadAlt /> Enviar imagem
                            </label>
                            <input className="hidden" id="product-image" type="file" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productName" className="font-bold">Nome do produto</label>
                            <input placeholder="Burguer" id="productName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productPrice" className="font-bold">Preço do produto</label>
                            <input onInput={handleCurrency} placeholder="R$:12,90" id="productPrice" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productCategory" className="font-bold">Categoria do produto</label>
                            
                            <select id="productCategory" className="text-gray-500 border border-gray-300 rounded-md p-3 w-52 outline-none">
                                {foodType.map((type:any, index:number) => (
                                    <option key={index} value={type.type}>{type.type}</option>
                                ))}
                             </select>
                            
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="productDescription" className="font-bold">Descrição do produto</label>
                        <textarea id="productDescription" className="resize-none border border-gray-300 h-20 rounded-md p-3 w-full outline-none" placeholder="carne, alface, etc" />
                    </div>
                    <button className="button">Adicionar produto</button>
                </form>
            </Modal>
        </>
    )
}