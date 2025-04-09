'use client'

import { Avaliation } from "@/types/restaurantDetails";
import { FaStar } from "react-icons/fa";

interface TestimonialsAndSatisfactionProps {
    avaliations: Avaliation[];
}

export function TestimonialsAndSatisfaction({ avaliations }:TestimonialsAndSatisfactionProps) {
    console.log(avaliations);

    return (
        <>
            <div className="mb-4 ml-5 grid grid-cols-1">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold">Últimas avaliações</h2>
                    <div className="mt-7 px-5 lg:px-0 grid m-auto lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-0">
                        {avaliations?.map(aval => (
                            <div key={aval.id} className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                                <div className="flex items-center gap-4">
                                    {/* <Image className="w-14 h-14 rounded-full object-cover aspect-square" src="/images/user-icon.png" width={50} height={50} alt="foto do usuário" /> */}
                                    <div className="flex flex-col gap-3">
                                        <h6 className="font-bold">{aval.userName}</h6>
                                        <div className="flex gap-3">
                                            {[...Array(aval.stars)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="font-thin text-gray-500">Avaliado em {new Date(aval.createdAt).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}</span>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-3">{aval.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="mt-5">
                    <h2 className="text-xl font-bold mb-4">Gráu de satisfação</h2>
                    <DonutChart />
                </div> */}
            </div>
        </>
    )
}