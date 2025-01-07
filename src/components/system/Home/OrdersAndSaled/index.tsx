import Image from "next/image";

export function OrdersAndSaled() {
    return (
        <>
             <div className="py-10 grid grid-cols-1 lg:grid-cols-3 flex-col lg:flex-row">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold">Últimos pedidos</h2>
                    <table className="mt-7 table-auto max-w-2xl w-full border-collapse border border-gray-300 shadow-md">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Usuário</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Endereço</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pedido</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cep</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Valor do pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                        <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                        <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                        <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                        <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-800">John Doe</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Rua lorem silva</td>
                        <td className="px-4 py-2 text-sm text-gray-800">Cheddar burguer</td>
                        <td className="px-4 py-2 text-sm text-gray-800">13545-90</td>
                        <td className="px-4 py-2 text-sm text-gray-800">R$:17,90</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="px-5">
                    <h2 className="text-xl font-bold">Mais vendidos</h2>
                    <div className="mt-7 overflow-y-scroll h-60 scrollDontShow">
                        <div className="flex gap-3 items-center border-b border-gray-300 pb-2">
                            <Image className="w-20 h-20 object-cover" src="/images/cheddar-burguer.jpg" width={200} height={200} alt="imagem do produto" />
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h5 className="font-bold">R$:18,90</h5>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center border-b border-gray-300 pb-2">
                            <Image className="w-20 h-20 object-cover" src="/images/cheddar-burguer.jpg" width={200} height={200} alt="imagem do produto" />
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h5 className="font-bold">R$:18,90</h5>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center border-b border-gray-300 pb-2">
                            <Image className="w-20 h-20 object-cover" src="/images/cheddar-burguer.jpg" width={200} height={200} alt="imagem do produto" />
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h5 className="font-bold">R$:18,90</h5>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center border-b border-gray-300 pb-2">
                            <Image className="w-20 h-20 object-cover" src="/images/cheddar-burguer.jpg" width={200} height={200} alt="imagem do produto" />
                            <div className="flex flex-col gap-3">
                                <h5 className="font-bold">Cheddar Burguer</h5>
                                <h5 className="font-bold">R$:18,90</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}