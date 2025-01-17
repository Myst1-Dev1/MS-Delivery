'use server';

import { Header } from "@/components/system/Header";
import { Banner } from "@/components/system/RestaurantAdminContent/Banner";
import { Form } from "@/components/system/RestaurantAdminContent/Form";
import { Products } from "@/components/system/RestaurantAdminContent/Products";
import { getRestaurantAdminDetails } from "@/services/graphql/graphql";
import { RestaurantDetails } from "@/types/restaurantDetails";

export default async function RestaurantAdmin() {
    const id = "677ec336ae29166373b2758b";
    const getAdminDetails = await getRestaurantAdminDetails(id);

    return (
        <>
            <div className="flex-1">
                <Header />
                {getAdminDetails.map((admin:RestaurantDetails) => (
                    <div key={admin.id} className="px-5 py-8">
                        <Banner banner={admin.banner.url} id={admin.banner.id} />
                        <div className="mt-7 grid gap-10 grid-cols-1 lg:grid-cols-3">
                            <Form title={admin.title} about={admin.about} address={admin.address} foodType={admin.foodTypes} />
                            <Products foodType={admin.foodTypes} categorie={admin.categorie} />    
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}