'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import Image from "next/image";
import { FaCloudUploadAlt, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Dishes } from "@/types/restaurantDetails";
import { FormatPrice } from "@/utils/formatPrice";
import { handleCurrency } from "@/utils/masks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/zod";
import { useEdgeStore } from "@/lib/edgestore";
import { handleDeleteProduct } from "@/services/graphql/graphql";
import { UpdateProduct } from "./updateProduct";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loading } from "@/components/global/Loading";
import { api } from "@/services/axios";

interface ProductsProps {
    foodType:String[];
    categorie:Dishes[];
    id: string;
    token:string | undefined;
}

export function Products({ foodType, categorie, id, token }:ProductsProps) {
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
    const [updateProductData, setUpdateProductData] = useState<Dishes[]>([]);
    const [file, setFile] = useState<File | any>();
    const [loading, setLoading] = useState(false);

    const { edgestore } = useEdgeStore();

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver:zodResolver(productSchema),
        defaultValues: {
            productImage: {
                file: [
                  new File(["conteúdo do arquivo"], "example.png", { type: "image/png" }),
                ],
              },
            productName: "",
            productPrice: "",
            productCategory: foodType[0],
            productDescription: "",
          },
    });

    async function handleCreateNewProduct(data:any) {
        try {
            setLoading(true);
            if(file) {
                const res = await edgestore.myPublicImages.upload({ file });

                if(res?.url) {
                    await api.post("/dishes",{
                        name: data.productName,
                        description: data.productDescription,
                        price: data.productPrice,
                        image: res.url,
                        menuOption: data.productCategory,
                        restaurantId: id 
                    }, {
                        headers: {
                          Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                      });
                    toast.success('Produto criado com sucesso.');
                    router.refresh();
                } else {
                    throw new Error("Falha ao gerar a URL do arquivo.");
                }
            }

            reset();
        } catch (error) {
            console.log('Falha ao criar novo produto', error);
            setLoading(false);
        }finally { setLoading(false); }
    }

    const categorieDataById = (id:string) => { 
        const data = categorie.filter(item => item.id === id);
        setUpdateProductData(data);

        setOpenUpdateProductModal(true);
    }

    return (
        <>
            <div className="col-span-2">
                <h2 className="font-bold text-xl">Gerenciar produtos</h2>
                <div className="mt-7 flex justify-between gap-9 flex-wrap">
                    {categorie.length === 0 ? 'Você ainda não tem produtos' : categorie.map(item => (
                        <div key={item.id} className="flex-shrink-0 flex gap-2 items-center lg:max-w-[300px] w-full border rounded-md border-gray-300 p-2">
                            <Image className="w-20 h-20 rounded-md object-cover" src={item.image || '/images/cheddar-burguer.jpg'} width={500} height={500} alt="foto do alimento" />
                            <div className="flex flex-col gap-1">
                                <h5 className="font-bold text-sm">{item.name}</h5>
                                <h6 className="font-bold text-sm">{FormatPrice(item.price)}</h6>
                                <p className="text-gray-500 text-sm max-w-[25ch] overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
                                <div className="flex gap-3">
                                    <div onClick={() => categorieDataById(item.id)} className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-green-300 hover:border-none">
                                        <FaPencilAlt className="text-green-600 text-sm flex-shrink-0" />
                                    </div>
                                    <div onClick={() => handleDeleteProduct(item.id)}  className="border p-2 border-zinc-500 rounded-md w-7 h-7 cursor-pointer flex justify-center items-center transition-all duration-500 hover:bg-red-300 hover:border-none">
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
                <form onSubmit={handleSubmit(handleCreateNewProduct)} className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <Image className="w-16 h-16 object-cover rounded-full aspect-square" src={`${!file ? '/images/uploadProduct.jpg' : URL.createObjectURL(file)}`} width={50} height={50} alt="imagem de upload do produto" />
                            <label htmlFor="product-image" className="cursor-pointer flex items-center gap-3">
                                <FaCloudUploadAlt /> Enviar imagem
                            </label>
                            <input {...register("productImage")} className="hidden" id="product-image" type="file" onChange={(e) => setFile(e.target.files?.[0])}  />
                            {errors.productImage && <p className="text-red-500">{errors.productImage.message}</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productName" className="font-bold">Nome do produto</label>
                            <input {...register("productName")} placeholder="Burguer" id="productName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                            {errors.productName && <p className="text-red-500">{errors.productName.message}</p>}
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productPrice" className="font-bold">Preço do produto</label>
                            <input {...register("productPrice", {
                                setValueAs: (value) => {
                                    if(typeof value !== "string") return value;

                                    const rawValue = value?.replace(/[^\d]/g, "");
                                    return parseFloat(rawValue) / 100;
                                },
                                })} onInput={handleCurrency} placeholder="R$:12,90" id="productPrice" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                            {errors.productPrice && <p className="text-red-500">{errors.productPrice.message}</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productCategory" className="font-bold">Categoria do produto</label>
                            
                            <select {...register("productCategory")} id="productCategory" className="text-gray-500 border border-gray-300 rounded-md p-3 w-52 outline-none">
                                {foodType.map((type:any, index:number) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                             </select>
                             {errors.productCategory && <p className="text-red-500">{String(errors.productCategory.message)}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="productDescription" className="font-bold">Descrição do produto</label>
                        <textarea {...register("productDescription")} id="productDescription" className="resize-none border border-gray-300 h-20 rounded-md p-3 w-full outline-none" placeholder="carne, alface, etc" />
                        {errors.productDescription && <p className="text-red-500">{errors.productDescription.message}</p>}
                    </div>
                    <button type="submit" className="button">
                        {loading ? <Loading /> : 'Enviar'}
                    </button>
                </form>
            </Modal>

            <UpdateProduct router={router} foodType={foodType} open={openUpdateProductModal} setOpen={setOpenUpdateProductModal} data={updateProductData} />
        </>
    )
}