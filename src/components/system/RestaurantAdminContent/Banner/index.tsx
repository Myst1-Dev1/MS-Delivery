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
}

export function Banner({ banner, id }:BannerProps) {
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

    return (
        <>
            <div style={{backgroundImage: `url(${banner})`}} className="relative bg-center bg-cover w-full h-48 rounded-md">
                <div onClick={() => setOpenBannerModal(true)} className="transition-all duration-500 hover:bg-orange-500 cursor-pointer hover:text-white rounded-full aspect-square bg-white w-10 h-10 flex justify-center items-center absolute top-2 right-2">
                    <FaPencilAlt />
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