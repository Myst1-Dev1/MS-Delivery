import { Header } from "@/components/system/Header";
import { Banner } from "@/components/system/RestaurantAdminContent/Banner";
import { Form } from "@/components/system/RestaurantAdminContent/Form";
import { Products } from "@/components/system/RestaurantAdminContent/Products";

export default function RestaurantAdmin() {
    return (
        <>
            <div className="flex-1">
                <Header />
                <div className="px-5 py-8">
                    <Banner />
                    <div className="mt-7 grid grid-cols-1 lg:grid-cols-3">
                        <Products />
                        <Form />
                    </div>
                </div>
            </div>
        </>
    )
}