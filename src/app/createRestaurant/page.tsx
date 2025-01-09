import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Home() {
    return (
        <>
            <div className="bg-vector-bg w-full min-h-screen bg-cover flex justify-center items-center">
                <form action="" className="mt-10 mb-10 p-5 bg-white max-w-xl w-full flex flex-col gap-4 m-auto">
                    <h1 className="text-xl text-center font-bold">Crie o seu restaurante</h1>
                     <div>
                        <label htmlFor="banner-file">
                            <div className="font-bold flex gap-4 justify-center items-center bg-zinc-100 cursor-pointer w-full h-24 rounded-md">
                                <FaCloudUploadAlt className="text-3xl text-orange-300" />
                                Enviar imagem do banner
                            </div>
                        </label>
                        <input id="banner-file" className="hidden" type="file" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                        <input placeholder="Los tacos" id="restaurantName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantDescription" className="font-bold">Descrição do restaurante</label>
                            <input placeholder="Somos um restaurante..." id="restaurantDescription" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantAdress" className="font-bold">Endereço do restaurante</label>
                            <input placeholder="RJ, Lorem silva" id="restaurantAdress" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantType" className="font-bold">Tipo do restaurante</label>
                            <input placeholder="Japonesa" id="restaurantType" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="restaurantCateogory" className="font-bold">Categorias de produtos</label>
                            <input placeholder="Entradas clássicas" id="restaurantCategory" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                    </div>
                    <h2 className="py-4 text-center font-bold">Adicione o primeiro produto</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productName" className="font-bold">Nome do produto</label>
                            <input placeholder="Salmão" id="productName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productPrice" className="font-bold">Preço do produto</label>
                            <input placeholder="R$:12,90" id="productPrice" type="number" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="productDescription" className="font-bold">Descrição do produto</label>
                            <input placeholder="Com cream chese etc" id="productDescription" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                        </div>
                         <div className="flex flex-col gap-3">
                            <Image className="w-[50px] h-[50px] object-cover" src="/images/uploadProduct.jpg" width={50} height={50} alt="imagem de upload do produto" />
                            <label htmlFor="product-image" className="cursor-pointer flex items-center gap-3">
                                <FaCloudUploadAlt /> Enviar imagem
                            </label>
                            <input className="hidden" id="product-image" type="file" />
                        </div>
                    </div>
                    <button className="button">Criar restaurante</button>
                </form>
            </div>
        </>
    )
}