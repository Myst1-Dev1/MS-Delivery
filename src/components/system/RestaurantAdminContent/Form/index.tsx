

export function Form() {
    return (
        <div>
            <h2 className="font-bold text-xl">Atualizar informações</h2>
            <form action="" className="max-w-96 w-full mt-7 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                    <input id="restaurantName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantCategory" className="font-bold">Nova categoria</label>
                    <input id="restaurantCategory" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantAbout" className="font-bold">Sobre o restaurante</label>
                    <textarea id="restaurantAbout" className="h-32 resize-none border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <button className="button w-full">Atualizar</button>
            </form>
        </div>
    )
}