'use server';

import { Header } from "@/components/system/Header";
import { Banner } from "@/components/system/RestaurantAdminContent/Banner";
import { Form } from "@/components/system/RestaurantAdminContent/Form";
import { Products } from "@/components/system/RestaurantAdminContent/Products";
import { getRestaurantAdminDetails } from "@/services/graphql/graphql";
import { RestaurantDetails } from "@/types/restaurantDetails";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function RestaurantAdmin() {
    const userId = (await cookies()).get('user');
    const getAdminDetails = await getRestaurantAdminDetails(userId?.value);

    return (
        <>
            <div className="flex-1">
                <Header />
                {getAdminDetails.lenght === 0 ? 
                    <div className="flex justify-center items-center">
                        <p className="text-xl font-bold">Voce ainda não possui um restaurante</p>
                        <Link className="button" href="/createRestaurant">
                            Criar restaurante
                        </Link>
                    </div>
                :
                getAdminDetails.map((admin:RestaurantDetails) => (
                    <div key={admin.id} className="px-5 py-8">
                        <Banner banner={admin.banner.url} id={admin.banner.id} />
                        <div className="mt-7 grid gap-0 lg:gap-10 grid-cols-1 lg:grid-cols-3">
                            <Form title={admin.title} about={admin.about} address={admin.address} />
                            <Products foodType={admin.foodTypes} categorie={admin.categorie} />    
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}