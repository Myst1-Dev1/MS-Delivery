import { Dispatch, SetStateAction } from "react"
import { RiArrowGoBackFill } from "react-icons/ri"

interface CardProps {
    setPaymentValue:Dispatch<SetStateAction<string>>
}

export function Card({ setPaymentValue }:CardProps) {
    return (
        <div className="relative">
            <RiArrowGoBackFill onClick={() => setPaymentValue('')} className="absolute text-xl -right-4 -top-2 cursor-pointer" />
            <h2 className="text-2xl font-bold text-center">Informe os dados do seu cartão</h2>
            <form className="mt-5">
                <div className="flex justify-between flex-col lg:flex-row gap-0">
                    <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                        <label className="font-bold" htmlFor="cardNumber">Número do cartão</label>
                        <input type="tel" id="cardNumber" placeholder="1234 5678 9101 1213" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    </div>
                    <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                        <label className="font-bold" htmlFor="cardName">Nome impresso no cartão</label>
                        <input type="text" id="cardName" placeholder="JOHN DOE V SILVA" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row gap-0 mt-0 lg:mt-5">
                    <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                        <label className="font-bold" htmlFor="cardDate">Data de vencimento</label>
                        <input type="tel" id="cardDate" placeholder="22/09" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    </div>
                    <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                        <label htmlFor="cardCode">Código de segurança</label>
                        <input type="text" id="cardCode" placeholder="555" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="mt-5 font-bold p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Finalizar pedido</button>
                </div>
            </form>
        </div>
    )
}