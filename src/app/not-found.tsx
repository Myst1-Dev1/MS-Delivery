import Image from "next/image";
import Link from "next/link";

export default function page404() {
    return (
        <>
            <div className="bg-[#FCF4F0] w-full h-screen flex flex-col lg:flex-row justify-center items-center">
                <Image src="/images/Chef-bro.svg" width={400} height={400} alt="foto da página de 404" />
                <div className="flex justify-center items-center flex-col gap-5">
                    <Image src="/images/404-img.png" width={300} height={300} alt="foto de 404" />
                    <h2 className="text-center text-xl font-thin">Parece que está página ainda está sendo preparada</h2>
                    <div className="flex gap-5">
                        <Link href="/">
                            <button className="bg-orange-400 text-white w-40 rounded-md p-3 transition-all duration-500 hover:bg-orange-600">Voltar para home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}