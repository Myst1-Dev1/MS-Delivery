'use client';

import { useTheme } from "@/hooks/useTheme";
import { Header } from "../Header";
import { OrdersAndSaled } from "../Home/OrdersAndSaled";
import { SalesChart } from "../Home/SalesChart";
import { TestimonialsAndSatisfaction } from "../Home/TestimonialsAndSatisfaction";

export function HomeAdminContent() {
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
                <TestimonialsAndSatisfaction />
            </div>
        </>
    )
}