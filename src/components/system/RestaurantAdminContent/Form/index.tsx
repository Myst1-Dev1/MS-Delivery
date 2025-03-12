'use client';

import { Loading } from "@/components/global/Loading";
import { infoSchema } from "@/lib/zod";
import { handleDeleteFoodType, handleUpdateRestaurant } from "@/services/graphql/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";
import { LogoUpdate } from "../LogoUpdate";

interface FormProps {
    logo:string;
    title:string;
    about:string;
    address:string;
    type: String[];
}

export function Form({ logo, title, about, address, type }:FormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver:zodResolver(infoSchema),
        defaultValues: {
        title: "",
        address: "",
        about: "",
        foodTypes: [""],
        }
    });

    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: "foodTypes",
      });
    
    const data = { title, address, about };

    async function handleUpdateRestaurantInformations(data:any) {
        setIsLoading(true);
        try {
            await handleUpdateRestaurant(data.title, data.address, data.about, `${data.foodTypes}`);

            toast.success('Restaurante atualizado com sucesso.');
            console.log('Informações atualizadas', data);
            router.refresh();
        } catch (error) {
            toast.error('Tivemos um erro ao atualizar o restaurante.');
            console.log('Erro ao atualizar informações do restaurante', error);
        }finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setValue("title", data.title);
        setValue("address", data.address);
        setValue("about", data.about);
    }, [setValue, data]);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-xl">Atualizar informações</h2>
            <LogoUpdate logo={logo} />
            <form onSubmit={handleSubmit(handleUpdateRestaurantInformations)} className="max-w-96 w-full mt-7 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                    <input {...register("title")} placeholder={title} id="restaurantName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantName" className="font-bold">Endereço do restaurante</label>
                    <input {...register("address")} placeholder={address} id="restaurantName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantCategory" className="font-bold">Nova categoria</label>
                    {type.map((type:any, index:number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="p-3 w-full bg-zinc-400 font-bold text-white rounded-md">
                                {type}
                            </div>
                            <FaTrashAlt onClick={() => handleDeleteFoodType(type)} className="text-red-600 cursor-pointer" />
                        </div>
                    ))}
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-2">
                        <input className="outline-none border p-3 rounded-md w-full" {...register(`foodTypes.${index}`)} />
                        <button type="button" onClick={() => remove(index)} className="text-red-500 font-bold"><FaTrashAlt /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append("")} className="mt-2 text-blue-500 font-bold">+ Adicionar categoria</button>
                    {errors.foodTypes && <p className="text-red-500">{errors.foodTypes.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantAbout" className="font-bold">Sobre o restaurante</label>
                    <textarea {...register("about")} placeholder={about} id="restaurantAbout" className="h-32 resize-none border border-gray-300 rounded-md p-3 w-full outline-none" />
                    {errors.about && <p className="text-red-500">{errors.about.message}</p>}
                </div>
                <button className="button w-full mb-5 lg:mb-0">
                    {isLoading ? <Loading /> : 'Atualizar'}
                </button>
            </form>
        </div>
    )
}