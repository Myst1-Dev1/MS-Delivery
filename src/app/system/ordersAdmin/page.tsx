import { Header } from "@/components/system/Header";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function OrdersAdmin() {
    return (
        <>
            <div className="flex-1">
                <Header />

                <div className="px-5 mt-5">
                    <h2 className="font-bold text-xl mb-5">Pedidos</h2>
                    <div className="max-w-xl lg:max-w-full overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
                            <thead className="bg-gray-100 border-b border-gray-300">
                                <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Usuário</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Endereço</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Informações adicionais</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cep</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Valor do pedido</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Sem salada, por favor</td>
                                <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                                <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <div className="cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-green-500 text-white rounded-xl">
                                        <FaCheck className="flex-shrink-0 text-xs" />
                                        <span>Aceitar</span>
                                    </div>
                                    <div className="cursor-pointer max-w-24 h-[30px] flex p-2 gap-2 items-center bg-red-600 text-white rounded-xl">
                                        <FaTimes className="flex-shrink-0 text-xs" />
                                        <span>Recusar</span>
                                    </div>
                                </td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Sem salada, por favor</td>
                                <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                                <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                                <td className="px-4 py-2 flex flex-col gap-2">
                                    <div className="flex p-2 gap-2 items-center">
                                        <div className="w-5 h-5 bg-red-600 rounded-full" />
                                        <span>Pedido recusado</span>
                                    </div>
                                </td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                                <td className="px-4 py-2 text-sm text-gray-800">Sem salada, por favor</td>
                                <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                                <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                                <td className="px-4 py-2 flex flex-col gap-2">
                                    <div className="flex p-2 gap-2 items-center">
                                        <div className="w-5 h-5 bg-green-500 rounded-full" />
                                        <span>Pedido aceito</span>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}