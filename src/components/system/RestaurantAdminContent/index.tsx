'use client';

import { Restaurant } from "@/types/restaurantDetails";
import { Header } from "../Header";
import Link from "next/link";
import { Banner } from "./Banner";
import { Form } from "./Form";
import { Products } from "./Products";
import { useTheme } from "@/hooks/useTheme";

interface RestaurantAdminContentProps {
    getAdminDetails: Restaurant[];
    token: any;
}

export function RestaurantAdminContent({ getAdminDetails, token }:RestaurantAdminContentProps) {
    const { theme } = useTheme();
    
    return (
        <>
            <div className={`flex-1 ${theme === 'dark' ? 'bg-[#202020] text-white' : ''}`}>
                <Header />
                {getAdminDetails?.length === 0 ? 
                    <div className="flex flex-col gap-3 m-auto justify-center items-center">
                        <p className="text-xl font-bold">Voce ainda não possui um restaurante</p>
                        <Link className="button" href="/createRestaurant">
                            Criar restaurante
                        </Link>
                    </div>
                :
                getAdminDetails.map((admin:Restaurant) => (
                    <div key={admin.id} className="px-5 py-8">
                        <Banner banner={admin.banner} id={admin.id} openRestaurant = {admin.isOpen} />
                        <div className="mt-7 grid gap-0 lg:gap-10 grid-cols-1 lg:grid-cols-3">
                            <Form logo={admin.logo} title={admin.name} about={admin.description} zipCode={admin.zipCode} address={admin.address} type={admin.menuOptions} id={admin.id} />
                            <Products foodType={admin.menuOptions} categorie={admin.dishes} id={admin.id} token={token?.value} />    
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}