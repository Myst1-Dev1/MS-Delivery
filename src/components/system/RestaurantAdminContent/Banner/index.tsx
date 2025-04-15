'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { FormEvent, useState } from "react";
import { FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/global/Loading";
import { api } from "@/services/axios";

interface BannerProps {
    banner:string;
    id:string;
    openRestaurant:boolean
}

export function Banner({ banner, id, openRestaurant }:BannerProps) {
    const [openBannerModal, setOpenBannerModal] = useState(false);
    const [file, setFile] = useState<File | null>();
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const { edgestore } = useEdgeStore();
    
    const handleUpdateBanner = async(e:FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (file) {
            const res = await edgestore.myPublicImages.upload({ file });
        
            if (res.url) {
                await api.put("/restaurant/banner/" + id, { banner: res.url });

                router.refresh();
                toast.success("Banner do restaurante atualizado com sucesso.");
                setFile(null);
            } else {
                throw new Error("Falha ao fazer upload da nova imagem.");
            }
            }
            
        } catch (error) {
            console.log("Falha ao atualizar o banner", error);
        } finally { setLoading(false); }
    }

    const handleOpenRestaurant = async (open: boolean) => {
        try {
          await api.put(`/restaurant/open/${id}`, { isOpen: open });
          router.refresh();
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                {/* <h2>Utilize o botão abaixo, para controlar se o restaurante está aberto ou fechado, se aberto aparecerá na página onde os restaurantes são exibidos, caso fechado, ele não será exibido.</h2> */}
                <span className="text-sm">{openRestaurant ? 'Restaurante Aberto' : 'Restaurante Fechado'}</span>
                <div
                    onClick={() => handleOpenRestaurant(!openRestaurant)}
                    className={`relative w-16 h-8 flex items-center px-1 rounded-full cursor-pointer transition-colors duration-300 ${
                        openRestaurant ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    >
                    <div
                        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        openRestaurant ? 'translate-x-[30px]' : 'translate-x-0'
                        }`}
                    ></div>
                </div>
            </div>
            <div style={{backgroundImage: `url(${banner})`}} className="mt-5 relative bg-center bg-cover w-full h-48 rounded-md">
                <div onClick={() => setOpenBannerModal(true)} className="transition-all duration-500 hover:bg-orange-500 cursor-pointer hover:text-white rounded-full aspect-square bg-white w-10 h-10 flex justify-center items-center absolute top-2 right-2">
                    <FaPencilAlt className="text-black" />
                </div>
            </div>
            <Modal open={openBannerModal} setOpen={setOpenBannerModal}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Atualizar banner</Dialog.Title>
                <form onSubmit={handleUpdateBanner} className="p-5 flex flex-col gap-3">
                    <div>
                        <label htmlFor="banner-file">
                            <div className="flex justify-center items-center bg-zinc-100 cursor-pointer w-full h-36 rounded-md">
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Preview" className="object-cover w-full h-full rounded-md" />
                                ) : (
                                    <FaCloudUploadAlt className="text-3xl text-orange-300" />
                                )}
                            </div>
                        </label>
                        <input name="file" id="banner-file" className="hidden" type="file" onChange={(e) => setFile(e.target.files?.[0])} />
                    </div>
                    <button type="submit" className="button max-w-24 w-full m-auto">
                      {loading ? <Loading /> : 'Atualizar'}
                    </button>
                </form>
            </Modal>
        </>
    )
}