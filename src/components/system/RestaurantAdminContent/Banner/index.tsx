'use client'

import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "@/components/global/Modal";
import { useState } from "react";
import { FaCloudUploadAlt, FaPencilAlt } from "react-icons/fa";

export function Banner() {
    const [openBannerModal, setOpenBannerModal] = useState(false);

    return (
        <>
            <div className="relative bg-restaurant-bg bg-center bg-cover w-full h-48 rounded-md">
                <div onClick={() => setOpenBannerModal(true)} className="transition-all duration-500 hover:bg-orange-500 cursor-pointer hover:text-white rounded-full aspect-square bg-white w-10 h-10 flex justify-center items-center absolute top-2 right-2">
                    <FaPencilAlt />
                </div>
            </div>
            <Modal open={openBannerModal} setOpen={setOpenBannerModal}>
                <Dialog.Title className="text-2xl text-center font-bold py-3">Atualizar banner</Dialog.Title>
                <form action="" className="p-5 flex flex-col gap-3">
                    <div>
                        <label htmlFor="banner-file">
                            <div className="flex justify-center items-center bg-zinc-100 cursor-pointer w-full h-24 rounded-md">
                                <FaCloudUploadAlt className="text-3xl text-orange-300" />
                            </div>
                        </label>
                        <input id="banner-file" className="hidden" type="file" />
                    </div>
                    <button className="button max-w-24 w-full m-auto">Atualizar</button>
                </form>
            </Modal>
        </>
    )
}