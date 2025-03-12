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
import { Dishes } from "@/types/restaurantDetails";
import { updateProduct } from "@/services/graphql/graphql";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Loading } from "@/components/global/Loading";

interface UpdateProductProps {
    router:AppRouterInstance;
    foodType:String[];
    open:boolean;
    setOpen:any;
    data:Dishes[];
}

export function UpdateProduct({ router, foodType, open, setOpen, data }:UpdateProductProps) {
    const [file, setFile] = useState<File | any>();
    const [loading, setLoading] = useState(false);
    
    const { edgestore } = useEdgeStore();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
          productImage: "",
          productName: "",
          productPrice: 0,
          productCategory: foodType[0],
          productDescription: "",
        },
      });
      
      useEffect(() => {
        if (data && data.length > 0) {
          const product = data[0];
      
          console.log("Dados do produto:", product);
      
          setValue("productImage", product.image || "");
          setValue("productName", product.name || "");
          setValue("productPrice", product.price || 0);
          setValue("productCategory", product.menuOption || foodType[0] || "");
          setValue("productDescription", product.description || "");
        }
      }, [data, setValue, foodType]);
      
      const imgUrl = data[0]?.image;
      const productId = data[0]?.id;
      
      const handleUpdateProduct = async (formData: any) => {
        setLoading(true);

        try {
          let updatedImageUrl = imgUrl;
      
          if (file) {
            const res = await edgestore.myPublicImages.upload({ file });
      
            if (res.url) {
              updatedImageUrl = res.url;
            } else {
              throw new Error("Falha ao fazer upload da nova imagem.");
            }
          }
      
          const updatedFields: any = {
            name: formData.productName,
            price: formData.productPrice,
            categoryTitle: formData.productCategory,
            description: formData.productDescription,
            image: {
              uploadUrl: updatedImageUrl,
            },
          };
      
          await updateProduct(
            updatedFields.categoryTitle,
            updatedFields.name,
            updatedFields.price,
            updatedFields.image.uploadUrl,
            updatedFields.image.id,
            productId,
            updatedFields.description
          );
      
          toast.success('Produto atualizado com sucesso.');
          router.refresh();
        } catch (error) {
          console.error("Erro ao atualizar produto:", error);
        }finally { setLoading(false) }
      };  

    return (
        <>
             <Modal open={open} setOpen={setOpen}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Atualizar produto</Dialog.Title>
                <form onSubmit={handleSubmit(handleUpdateProduct)} className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between flex-wrap">
                        <div className="flex flex-col gap-3">
                            <Image className="w-16 h-16 object-cover rounded-full aspect-square" src={`${!file ? watch("productImage") : URL.createObjectURL(file)}`} width={200} height={200} alt="imagem de upload do produto" />
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
                      {loading ? <Loading /> : 'Atualizar produto'}
                    </button>
                </form>
            </Modal>
        </>
    )
}