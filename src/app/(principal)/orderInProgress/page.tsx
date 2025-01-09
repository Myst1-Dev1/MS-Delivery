import { Map } from "@/components/principal/Map";
import { FaRocketchat } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";

export default function OrderInProgress() {
    return (
        <>
            <div className="w-full flex flex-col gap-5 py-8 justify-center items-center">
                <h1 className="text-xl font-bold">Acompanhe seu pedido</h1>
                <div className="max-w-md mb-24 w-full h-48 rounded-md">
                    <Map />
                </div>
                <div className="px-6 lg:px-0 max-w-md flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <span className="animate-ping bg-yellow-400 w-5 h-5 rounded-full"></span>
                        <h6 className="font-bold">Pedido sendo preparado em breve sairá para entrega</h6>
                    </div>
                    <div>
                        <h6 className="font-bold">Pedido</h6>
                        <div className="flex flex-col gap-2 mt-2">
                           <span>1 cheese burguer</span> 
                           <span>1 batata</span> 
                           <span>1 coca zero lata</span> 
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        <h6 className="font-bold">Total</h6>
                        <h6>R$:33,00</h6>
                    </div>
                    <div className="flex justify-between w-full">
                        <h6 className="font-bold">Pagamento</h6>
                        <div className="flex items-center gap-3">
                            <FaPix className="text-green-400" />
                            Pix
                        </div>
                    </div>
                    <div className="invisible font-bold gap-3 cursor-pointer flex justify-end items-center">
                        <FaRocketchat />
                        Chat
                    </div>
                    <button className="button">Recebi meu pedido</button>
                </div>
            </div>
        </>
    )
}