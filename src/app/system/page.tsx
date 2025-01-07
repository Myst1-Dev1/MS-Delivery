import { Header } from "@/components/system/Header";
import { OrdersAndSaled } from "@/components/system/Home/OrdersAndSaled";
import { SalesChart } from "@/components/system/Home/SalesChart";
import { TestimonialsAndSatisfaction } from "@/components/system/Home/TestimonialsAndSatisfaction";

export default function Home() {
    return (
        <>
            <div className="flex-1">
                <Header />
                <div className="ml-4 py-5">
                    <div>
                        <h2 className="text-xl font-bold">Gráfico de vendas</h2>
                        <SalesChart />
                    </div>
                    <OrdersAndSaled />
                </div>
                <TestimonialsAndSatisfaction />
            </div>
        </>
    )
}