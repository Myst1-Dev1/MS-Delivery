'use client';

import { Loading } from "@/components/global/Loading";
import { infoSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { LogoUpdate } from "../LogoUpdate";
import { api } from "@/services/axios";
import { handleCepChange } from "@/utils/cepChange";

interface FormProps {
    logo:string;
    title:string;
    about:string;
    address:string;
    zipCode:string;
    type: string[];
    id:string;
}

export function Form({ logo, title, about, address, zipCode, type, id }:FormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const { register, control, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        resolver:zodResolver(infoSchema),
        defaultValues: {
        title: "",
        address: "",
        zipCode: "",
        about: "",
        foodTypes: [""],
        }
    });

    const { fields, append, remove } = useFieldArray<any>({
        control,
        name: "foodTypes",
      });
    
    const data = { title, address, zipCode, about, type };

    async function handleUpdateRestaurantInformations(data:any) {
        setIsLoading(true);
        try {
            const menuOptions = [
                ...type,
                ...(Array.isArray(data.foodTypes) ? data.foodTypes : [data.foodTypes])
            ];

            if (data.address !== address && (data.zipCode === zipCode || !data.zipCode)) {
                return alert('Você precisa preencher um novo CEP para alterar o endereço.');
            }

            await api.put("/restaurant/info/" + id, {
                name: data.title,
                address: data.address,
                zipCode: data.zipCode,
                description: data.about,
                menuOptions
            })

            toast.success('Restaurante atualizado com sucesso.');
            console.log('Informações atualizadas', data);
            router.refresh();
            reset();
        } catch (error) {
            toast.error('Tivemos um erro ao atualizar o restaurante.');
            console.log('Erro ao atualizar informações do restaurante', error);
        }finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteFoodType(typeName:string) {
        try {
            const menuOptions = type.filter(option => option !== typeName);

            await api.put("/restaurant/info/" + id, {
                menuOptions
            });

            router.refresh();
            toast.success('Opção de prato removida com sucesso');
        } catch (error) {
            console.log('Falha ao deletar o tipo de prato', error);
        }
    }

    useEffect(() => {
        setValue("title", data.title);
        setValue("address", data.address);
        setValue("about", data.about);
        setValue("zipCode", data.zipCode);
    }, [setValue, data]);

    return (
        <div className="flex-shrink-0">
            <LogoUpdate logo={logo} id={id} />
            <h2 className="font-bold text-xl">Atualizar informações</h2>
            <form onSubmit={handleSubmit(handleUpdateRestaurantInformations)} className="max-w-96 w-full mt-7 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                    <input defaultValue={title} {...register("title")} placeholder={title} id="restaurantName" type="text" className="input bg-transparent" />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="address" className="font-bold">Endereço do restaurante</label>
                    <input {...register("address")} placeholder={address} id="address" type="text" className="input bg-transparent" />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantzipCode" className="font-bold">CEP do restaurante</label>
                    <input 
                        {...register("zipCode")} 
                        placeholder={address} 
                        id="restaurantZipCode" 
                        type="tel" 
                        className="input bg-transparent" 
                        onBlur={(e) => handleCepChange(e.target.value)}
                    />
                    {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantCategory" className="font-bold">Nova categoria</label>
                    {type.map((type:any, index:number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="p-3 w-full bg-orange-400 font-bold text-white rounded-md">
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
                    <textarea {...register("about")} placeholder={about} id="restaurantAbout" className="h-32 resize-none input bg-transparent" />
                    {errors.about && <p className="text-red-500">{errors.about.message}</p>}
                </div>
                <button className="button w-full mb-5 lg:mb-0">
                    {isLoading ? <Loading /> : 'Atualizar'}
                </button>
            </form>
        </div>
    )
}