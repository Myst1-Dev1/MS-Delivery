import { Loading } from "@/components/global/Loading";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/services/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaUpload } from "react-icons/fa6";
import { toast } from "react-toastify";

interface LogoUpdateProps {
    logo:string;
    id:string;
}

export function LogoUpdate({ logo, id }:LogoUpdateProps) {
    const [file, setFile] = useState<File | null>();
    const [loading, setLoading] = useState(false);

    const router = useRouter()
    const { edgestore } = useEdgeStore();

    const handleUpdateLogo = async(e:FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
           
            if (file) {
            const res = await edgestore.myPublicImages.upload({ file });
        
            if (res.url) {
                await api.put("/restaurant/logo/" + id, { logo: res.url });

                router.refresh();
                toast.success("Logo do restaurante atualizado com sucesso.");
                setFile(null);
            } else {
                throw new Error("Falha ao fazer upload da nova imagem.");
            }
            } 
        } catch (error) {
            console.log('Falha ao atualizar a logo do restaurante', error);
        } finally{ setLoading(false); }
    }

    return (
        <form className="mb-5" onSubmit={handleUpdateLogo}>
            <div className="flex mt-3 gap-3 items-center relative">
                {
                    file ?
                    (
                    <Image className="w-16 h-16 object-cover rounded-full" src={URL.createObjectURL(file)} width={200} height={200} alt="logo do restaurante" />
                    )
                    : (
                    <Image className="w-16 h-16 object-cover rounded-full" src={logo} width={200} height={200} alt="logo do restaurante" />
                    )
                }
                <label className="cursor-pointer" htmlFor="logo-file"><FaUpload /></label>
                <input type="file" className="hidden" id="logo-file" onChange={(e) => setFile(e.target.files?.[0])} />
            </div>
            <button className="button mt-3">
                 {loading ? <Loading /> : 'Atualizar logo'}
            </button>
        </form>
    )
}