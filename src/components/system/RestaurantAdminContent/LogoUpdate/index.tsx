import Image from "next/image";
import { FaUpload } from "react-icons/fa6";

interface LogoUpdateProps {
    logo:string;
}

export function LogoUpdate({ logo }:LogoUpdateProps) {
    return (
        <div className="flex mt-3 gap-3 items-center relative">
            <Image className="w-16 h-16 object-cover rounded-full" src={logo || '/images/burguer.webp'} width={200} height={200} alt="logo do restaurante" />
            <label className="cursor-pointer" htmlFor="logo-file"><FaUpload /></label>
            <input type="file" className="hidden" id="logo-file" />
        </div>
    )
}