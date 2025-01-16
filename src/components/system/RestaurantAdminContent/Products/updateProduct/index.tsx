import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useEdgeStore } from "@/lib/edgestore";
import { productSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { handleCurrency } from "@/utils/masks";
import { Category } from "@/types/restaurantDetails";
import { updateProduct } from "@/services/graphql/graphql";

interface UpdateProductProps {
    foodType:[] | any;
    open:boolean;
    setOpen:any;
    data:Category[];
}

export function UpdateProduct({ foodType, open, setOpen, data }:UpdateProductProps) {
    const [file, setFile] = useState<File | any>();
    
        const { edgestore } = useEdgeStore();
    
        const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
            resolver: zodResolver(productSchema),
            defaultValues: {
              productImage: "",
              productName: "",
              productPrice: 0,
              productCategory: foodType[0]?.type,
              productDescription: "",
            },
          });
          
          useEffect(() => {
            if (data && data.length > 0) {
              const product = data[0];
          
              console.log("Dados do produto:", product);
          
              setValue("productImage", product.image?.url || "");
              setValue("productName", product.name || "");
              setValue("productPrice", product.price || 0);
              setValue("productCategory", product.categoryTitle || foodType[0]?.type || "");
              setValue("productDescription", product.description || "");
            }
          }, [data, setValue, foodType]);
          
          const imgUrl = data[0]?.image?.url;
          const imgId = data[0]?.image?.id;
          const productId = data[0]?.id;
          
          const handleUpdateProduct = async (formData: any) => {
            try {
              const newImgUrl = formData.productImage !== imgUrl ? formData.productImage : imgUrl;
          
              const updatedFields: any = {
                name: formData.productName,
                price: formData.productPrice,
                categoryTitle: formData.productCategory,
                description: formData.productDescription,
              };

              if (newImgUrl !== imgUrl) {
                updatedFields.image = {
                  uploadUrl: newImgUrl,
                  id: imgId,
                };
              }
          
              console.log("Dados enviados para atualização:", updatedFields);
    
              await updateProduct(formData.productCategory, formData.productName, formData.productPrice, imgUrl, imgId, productId, formData.productDescription);
          
              console.log("Produto atualizado com sucesso");
            } catch (error) {
              console.error("Erro ao atualizar produto:", error);
            }
          };

    return (
        <>
             <Modal open={open} setOpen={setOpen}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Criar novo produto</Dialog.Title>
                <form onSubmit={handleSubmit(handleUpdateProduct)} className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <Image className="w-16 h-16 object-cover rounded-full aspect-square" src={`${!file ? watch("productImage") : URL.createObjectURL(file)}`} width={50} height={50} alt="imagem de upload do produto" />
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
                                    <option key={index} value={type.type}>{type.type}</option>
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
                    <button type="submit" className="button">Adicionar produto</button>
                </form>
            </Modal>
        </>
    )
}