'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useState } from "react";
import { FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";
import { updateRestaurantBanner } from "@/services/graphql/graphql";
import { useEdgeStore } from "@/lib/edgestore";

interface BannerProps {
    banner:string;
    id:string;
}

export function Banner({ banner, id }:BannerProps) {
    const [openBannerModal, setOpenBannerModal] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null | any>(null);
    const [file, setFile] = useState<File>();

    const { edgestore } = useEdgeStore();
    
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
    
      try {
        if (file) {
          const res = await edgestore.myPublicImages.upload({ file });
    
          if (res?.url) {
            await updateRestaurantBanner("677ec336ae29166373b2758b", id, res.url);
            setPreviewUrl(res.url);

            console.log('Sucesso');
          } else {
            throw new Error("Falha ao gerar a URL do arquivo.");
          }
        } else {
          throw new Error("Nenhum arquivo foi selecionado.");
        }
      } catch (error) {
        console.error("Erro ao atualizar o banner:", error);
        alert(`Erro ao atualizar o banner: ${error}`);
      }
    };

    return (
        <>
            <div style={{backgroundImage: `url(${banner})`}} className="relative bg-center bg-cover w-full h-48 rounded-md">
                <div onClick={() => setOpenBannerModal(true)} className="transition-all duration-500 hover:bg-orange-500 cursor-pointer hover:text-white rounded-full aspect-square bg-white w-10 h-10 flex justify-center items-center absolute top-2 right-2">
                    <FaPencilAlt />
                </div>
            </div>
            <Modal open={openBannerModal} setOpen={setOpenBannerModal}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Atualizar banner</Dialog.Title>
                <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
                    <div>
                        <label htmlFor="banner-file">
                            <div className="flex justify-center items-center bg-zinc-100 cursor-pointer w-full h-24 rounded-md">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="object-cover w-full h-full rounded-md" />
                                ) : (
                                    <FaCloudUploadAlt className="text-3xl text-orange-300" />
                                )}
                            </div>
                        </label>
                        <input name="file" id="banner-file" className="hidden" type="file" onChange={(e) => setFile(e.target.files?.[0])} />
                    </div>
                    <button type="submit" className="button max-w-24 w-full m-auto">Atualizar</button>
                </form>
            </Modal>
        </>
    )
}