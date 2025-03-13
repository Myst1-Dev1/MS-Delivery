'use server';

import { Header } from "@/components/system/Header";
import { Banner } from "@/components/system/RestaurantAdminContent/Banner";
import { Form } from "@/components/system/RestaurantAdminContent/Form";
import { Products } from "@/components/system/RestaurantAdminContent/Products";
import { fetchRestaurantByUserId } from "@/services/fetchData/fetchRestaurantByUserId";
import { Restaurant } from "@/types/restaurantDetails";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function RestaurantAdmin() {
    const cookie = await cookies();
    const id:any = cookie.get('user-token')

    const token = cookie.get('token')

    const user = JSON.parse(id?.value);
    const getAdminDetails = await fetchRestaurantByUserId(user.id);

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
                getAdminDetails.map((admin:Restaurant) => (
                    <div key={admin.id} className="px-5 py-8">
                        <Banner banner={admin.banner} id={admin.id} />
                        <div className="mt-7 grid gap-0 lg:gap-10 grid-cols-1 lg:grid-cols-3">
                            <Form logo={admin.logo} title={admin.name} about={admin.description} address={admin.address} type={admin.menuOptions} id={admin.id} />
                            <Products foodType={admin.menuOptions} categorie={admin.dishes} id={admin.id} token={token?.value} />    
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}