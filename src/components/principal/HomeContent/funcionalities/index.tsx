import Image from "next/image";


export function Funcionalities() {
    return (
        <>
            <div>
                <h2 className="text-2xl text-center font-bold">Como O Nosso Sistema Funciona</h2>
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 lg:gap-0 gap-6">
                    <div className="m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/createYourOwnRestaurant.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="text-xl font-bold">Crie o seu próprio restaurante</h3>
                        <p className="mt-2 text-gray-600">
                            Escolha o tipo de conta: restaurante ou cliente. Selecione 'restaurante' para criar o seu negócio e gerenciar pratos, vendas e pedidos.
                        </p>
                    </div>
                    <div className="m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/adminOrders.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="text-xl font-bold">Receba e gerencie pedidos</h3>
                        <p className="mt-2 text-gray-600">
                            Tenha controle total sobre cada pedido recebido. Aceite recuse ou conclua diretamente pelo painel de administração.
                        </p>
                    </div>
                    <div className="m-auto min-h-80 h-full max-w-80 w-full border border-gray-300 rounded-lg p-3 transition-all duration-500 hover:bg-orange-500 hover:text-white">
                        <Image className="max-w-52 m-auto w-full object-cover" src="/images/chatWithClient.webp" width={200} height={200} alt="imagem de criar restaurante" />
                        <h3 className="text-xl font-bold">Converse com seus clientes</h3>
                        <p className="mt-2 text-gray-600">
                            Use o chat em tempo real para tirar dúvidas e manter o contato com seus clientes durante o pedido.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}