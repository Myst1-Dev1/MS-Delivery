'use server';

import { OrdersData } from "@/components/principal/OrdersData";
import { FetchAllOrders } from "@/services/fetchData/fetchOrders";

export default async function Orders() {
    const data = await FetchAllOrders();

    return (
        <>
            <div className="px-4 lg:px-16 py-10">
                <h2 className="text-xl font-bold">Últimos pedidos</h2>

                <OrdersData order = {data} />
            </div>
        </>
    )
}