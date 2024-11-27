

export function Money() {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor="money" className="font-bold text-xl">Precisa de troco?</label>
            <input id="money" type="tel" placeholder="R$:0,00" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
            <div className="flex justify-center">
                <button className="mt-5 font-bold p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Finalizar pedido</button>
            </div>
        </div>
    )
}