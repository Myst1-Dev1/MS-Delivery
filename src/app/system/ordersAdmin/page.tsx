import { Header } from "@/components/system/Header";
import { OrderAdminContent } from "@/components/system/OrderAdminContent";

export default function OrdersAdmin() {

    return (
        <>
            <div className="flex-1">
                <Header />

                <OrderAdminContent />
            </div>
        </>
    )
}