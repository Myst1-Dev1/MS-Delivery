

interface FormProps {
    title:string;
    about:string;
}

export function Form({ title, about }:FormProps) {
    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-xl">Atualizar informações</h2>
            <form action="" className="max-w-96 w-full mt-7 flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantName" className="font-bold">Nome do restaurante</label>
                    <input placeholder={title} id="restaurantName" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantCategory" className="font-bold">Nova categoria</label>
                    <input placeholder="Entradas clássicas" id="restaurantCategory" type="text" className="border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="restaurantAbout" className="font-bold">Sobre o restaurante</label>
                    <textarea placeholder={about} id="restaurantAbout" className="h-32 resize-none border border-gray-300 rounded-md p-3 w-full outline-none" />
                </div>
                <button className="button w-full">Atualizar</button>
            </form>
        </div>
    )
}