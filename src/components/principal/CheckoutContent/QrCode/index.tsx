import Image from "next/image";
import { FaCopy } from "react-icons/fa";


export function QrCode() {
    return (
        <div className="flex w-full flex-col justify-center items-center gap-4">
            <Image src='/images/qrcode.png' width={200} height={200} alt="qrcode" />
            <div className="cursor-pointer flex justify-between items-center gap-2 w-full max-w-64 h-10 p-3 bg-gray-100 rounded-md">
                <span>w9rt8we89truhuhuht97et</span>
                <FaCopy className="text-orange-500" />
            </div>
            <p className="text-gray-500 text-justify m-auto">Seu qrcode é valido por 10 minutos, se o pagamento não for efetuado durante esse tempo, o pedido será cancelado.</p>
        </div>
    )
}