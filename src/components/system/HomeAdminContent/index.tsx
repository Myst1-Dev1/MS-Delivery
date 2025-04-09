'use client';

import { useTheme } from "@/hooks/useTheme";
import { Header } from "../Header";
import { OrdersAndSaled } from "../Home/OrdersAndSaled";
import { SalesChart } from "../Home/SalesChart";
// import { TestimonialsAndSatisfaction } from "../Home/TestimonialsAndSatisfaction";
import { Restaurant } from "@/types/restaurantDetails";
import { FaStar } from "react-icons/fa";

interface HomeAdminContentProps {
    admin: Restaurant | any;
}

export function HomeAdminContent({ admin }:HomeAdminContentProps) {
    const { theme } = useTheme();

     return (
        <>
            <div className={`flex-1 ${theme === 'dark' ? 'bg-[#202020] text-white' : ''}`}>
                <Header />
                <div className="ml-4 py-5">
                    <div>
                        <h2 className="text-xl font-bold mb-5">Gráfico de vendas</h2>
                        <SalesChart />
                    </div>
                    <OrdersAndSaled />
                </div>
                <div className="mb-4 ml-5 grid grid-cols-1">
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold">Últimas avaliações</h2>
                        <div className="mt-7 px-5 lg:px-0 grid m-auto lg:grid-cols-3 grid-cols-1 gap-4 lg:gap-0">
                            {admin?.map((adm:any) =>
                                adm.avaliations?.map((aval:any) => (
                                    <div key={aval.id} className="lg:max-w-72 w-full p-5 rounded-md border border-gray-300">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col gap-3">
                                        <h6 className="font-bold">{aval.userName}</h6>
                                        <div className="flex gap-3">
                                            {[...Array(aval.stars)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className={`font-thin ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-3`}>
                                            Avaliado em {new Date(aval.createdAt).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            })}
                                        </span>
                                        </div>
                                    </div>
                                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-3`}>{aval.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    {/* <div className="mt-5">
                        <h2 className="text-xl font-bold mb-4">Gráu de satisfação</h2>
                        <DonutChart />
                    </div> */}
                </div>
            </div>
        </>
    )
}