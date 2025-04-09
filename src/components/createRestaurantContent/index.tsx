'use client'

import { useUser } from "@/hooks/useUser";
import { useEdgeStore } from "@/lib/edgestore";
import { restaurantSchema } from "@/lib/zod";
import { api } from "@/services/axios";
import { Restaurant } from "@/types/restaurantDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCheck, FaCloudUploadAlt } from "react-icons/fa";

interface CreateRestaurantContentProps {
    token:string | undefined;
    restaurant: Restaurant;
}

export default function CreateRestaurantContent({ token, restaurant }:CreateRestaurantContentProps) {
  const { user } = useUser();

  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [logo, setLogo] = useState<File | any>();
  
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      bannerUrl: "",
      logo:"",
      title: "",
      about: "",
      address: "",
      type: "",
      foodTypes: [""],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "foodTypes",
  });

  const onSubmit = async (data: any) => {
    try {
        setIsLoading(true);
        setIsSubmited(true);

        const foodTypes = data.foodTypes.map((item: any) => item.type || item);

        if (file && logo) {
            const bannerUpload = await edgestore.myPublicImages.upload({ file });
            const logoUpload = await edgestore.myPublicImages.upload({ file: logo });

            if (bannerUpload.url && logoUpload.url) {
                await api.post("/restaurant", {
                  name: data.title,
                  logo: logoUpload.url,
                  banner: bannerUpload.url,
                  address: data.address,
                  description:data.about,
                  type: data.type,
                  menuOptions: foodTypes,
                  isOpen: false,
                  userId: user?.id,
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  withCredentials: true
                });
            } else {
                throw new Error("Falha ao gerar a URL do arquivo.");
            }
        } else {
            throw new Error("Arquivo de imagem não encontrado.");
        }

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmited(true);
        }, 2000);

        console.log('Criado com sucesso', data);
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
        setIsLoading(false);
    }
  };

    return (
        <>
            {Object.keys(restaurant).length !== 0 ?
              <div className="bg-vector-bg w-full min-h-screen bg-cover flex justify-center items-center">
                  <div className="bg-white max-w-xl p-3 rounded-md mt-5 mb-5 flex flex-col justify-center items-center gap-4">
                    <h2 className="font-bold text-xl">Você já possui um restaurante, acesse o painel e comece a gerencia-lo</h2>
                    <Link className="button" href="/system/restaurantAdmin">Acessar restaurante</Link>
                </div>
              </div>
              :
              <div className="bg-vector-bg w-full min-h-screen bg-cover flex justify-center items-center">
                <div className="rounded-md p-5 bg-white max-w-xl w-full">
                    {!isSubmited ? ( 
                      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 m-auto">
                        <h1 className="text-xl text-center font-bold">Crie o seu restaurante</h1>
                        <div>
                            <label htmlFor="banner-file">
                                <span className="font-bold">Banner</span>
                                <div className="font-bold mt-3 flex gap-4 justify-center items-center bg-zinc-100 cursor-pointer w-full h-24 rounded-md">
                                {file ? (
                                    <Image src={URL.createObjectURL(file)} width={200} height={96} alt="Preview" className="object-cover w-full h-full rounded-md" />
                                ) : (
                                    <FaCloudUploadAlt className="text-3xl text-orange-300" />
                                )}
                                </div>
                            </label>
                            <input id="banner-file" className="hidden" type="file" {...register("bannerUrl")} onChange={(e) => setFile(e.target.files?.[0])}/>
                            {errors.bannerUrl && <p className="text-red-500">{errors.bannerUrl.message}</p>}
                        </div>
                        <div>
                          <label htmlFor="logo-file" className="cursor-pointer grid place-items-center">
                            <span className="font-bold mb-3">Logo</span>
                            {logo ? (
                              <Image src={URL.createObjectURL(logo)} className="h-16 w-16 object-cover rounded-full" width={200} height={200} alt="logo"/>
                            ) : (
                              <div className="grid place-items-center h-16 w-16 object-cover rounded-full bg-zinc-100">
                                <FaCloudUploadAlt className="text-3xl text-orange-300" />
                              </div>
                            )}
                          </label>
                          <input type="file" className="hidden" id="logo-file" {...register("logo")} onChange={(e) => setLogo(e.target.files?.[0])} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                            <input placeholder="Los tacos" id="restaurantName" type="text" {...register("title")} className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantDescription" className="font-bold">Descrição do restaurante</label>
                            <textarea placeholder="Somos um restaurante..." id="restaurantDescription" {...register("about")} className="border border-gray-300 rounded-md p-3 w-full h-28 resize-none outline-none" />
                            {errors.about && <p className="text-red-500">{errors.about.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="restaurantType" className="font-bold">Tipo do restaurante</label>
                                <input placeholder="Japonesa" id="restaurantType" type="text" {...register("type")} className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                                {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label htmlFor="restaurantAdress" className="font-bold">Endereço do restaurante</label>
                                <input placeholder="RJ, Lorem silva" id="restaurantAdress" type="text"  {...register("address")} className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="font-bold">Categorias</label>
                            {fields.map((item, index) => (
                                <div key={item.id} className="flex items-center gap-2">
                                <input className="outline-none border p-3 rounded-md w-full" {...register(`foodTypes.${index}`)} />
                                <button type="button" onClick={() => remove(index)} className="text-red-500 font-bold">Remover</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => append("")} className="mt-2 text-blue-500 font-bold">+ Adicionar categoria</button>
                            {errors.foodTypes && <p className="text-red-500">{errors.foodTypes.message}</p>}
                        </div>
                        <button className="button">Criar restaurante</button>
                    </form>
                    ) : (
                      <div>
                        {isLoading ? (
                          <div className="flex flex-col gap-5 justify-center items-center">
                            <h5 className="font-thin text-xl">O seu restaurante está sendo criado, por favor aguarde!</h5>
                            <div className="loader-create"/>
                          </div>
                          ) : (
                        <div className="mt-5 mb-5 flex flex-col justify-center items-center gap-4">
                            <div className="rounded-full bg-green-500 w-20 h-20 flex justify-center items-center">
                                <FaCheck className="text-3xl text-white m-auto" />
                            </div>
                            <h2>Restaurante criado com sucesso</h2>
                            <p>Agora você pode criar produtos e gerenciar o seu restaurante.</p>
                            <Link className="button" href="/system/restaurantAdmin">Acessar restaurante</Link>
                        </div>
                        )}
                      </div>
                    )}
                </div>
            </div>
            }
        </>
    )
}