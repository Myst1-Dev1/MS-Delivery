import Image from "next/image"

export function WhyChooseUs() {
    return (
        <>
            <div className="py-8 flex gap-5 lg:gap-0 flex-col-reverse lg:flex-row items-center flex-wrap justify-evenly">
                <Image src="/images/whyChoose.webp" width={400} height={400} alt="imagem de porque nos escolher" />
                <div className="max-w-md w-full flex flex-col gap-3">
                    <h2 className="text-2xl lg:text-4xl font-bold text-orange-500">Por que nos <br /> escolher</h2>
                    <p>Oferecemos um serviço de entrega rápido, confiável e eficiente para restaurantes e clientes.</p>
                    <p>Nossa plataforma é facil de usar e fornece uma comunicação transparente durante todo o processo.</p>
                    <div className="flex flex-wrap gap-10">
                        <div className="w-fit">
                            <h5 className="text-sm lg:text-xl font-bold">Clientes satisfeitos</h5>
                            <h6 className="text-xl lg:text-2xl font-bold text-orange-500">300+</h6>
                        </div>
                        <div className="w-fit">
                            <h5 className="text-sm lg:text-xl font-bold">Anos de serviço</h5>
                            <h6 className="text-xl lg:text-2xl font-bold text-orange-500">2</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}