'use client';

import Image from "next/image";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

export function Header() {
    const [haveOrder, setHaveOrder] = useState(false);

    return (
        <>
            <div className="flex justify-end items-end py-4 border-b border-gray-300 w-full">
                <div className="px-5 flex items-center gap-5">
                    <div className="relative">
                        <FaBell className="text-xl transition-all duration-500 cursor-pointer hover:text-orange-500" />
                        {/* <span className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center rounded-full">1</span> */}
                    </div>
                    <Image className="w-9 h-9 rounded-full aspect-square object-cover" src="/images/user-icon.png" width={100} height={100} alt="foto do restaurante" />
                </div>
            </div>

            {haveOrder &&
            <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg max-w-80 w-full absolute z-50 top-16 bg-white right-4">
                <div className="flex items-center gap-3">
                    <Image className="w-10 h-10 object-cover rounded-full aspect-square" src="/images/cheddar-burguer.jpg" width={50} height={50} alt="foto do usuário" />
                    <span className="font-bold">Recebeu um pedido de John Doe</span>
                </div>
                <div className="flex items-center gap-3">
                    <Image className="w-10 h-10 object-cover rounded-full aspect-square" src="/images/cheddar-burguer.jpg" width={50} height={50} alt="foto do usuário" />
                    <span className="font-bold">Recebeu um pedido de John Doe</span>
                </div>
            </div>
            }
        </>
    )
}