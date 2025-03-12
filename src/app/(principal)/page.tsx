'use server' 

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FoodType } from "@/components/principal/FoodType";
import Link from "next/link";
import { FetchRestaurants } from "@/services/fetchData/fetchRestaurants";
import { Restaurant } from "@/types/restaurantDetails";

export default async function Home() {
    const restaurants = await FetchRestaurants();

    return (
        <>
            <div className="bg-home-bg w-full min-h-[80vh] bg-cover flex justify-center items-center">
                <div className="px-4 lg:px-0 mt-16 flex flex-col items-center gap-4">
                    <h2 className="text-2xl lg:text-3xl font-bold">Os Melhores Restaurantes <br /> Com A Melhor Entrega</h2>
                    <p className="text-black">Entregamos sua comida com excelência na porta da sua casa</p>
                    <button className="font-bold p-3 text-white bg-orange-500 rounded-md max-w-72 w-full transition-all duration-500 hover:bg-orange-600">Ver Restaurantes</button>
                </div>
            </div>

            <FoodType />

            <div className="px-4 lg:px-16 py-16 flex flex-col justify-center">
                <h2 className="text-xl font-bold">Todos os Restaurantes</h2>
                <span className="text-orange-500 font-bold mt-3">{restaurants?.length} Resultados</span>
                <div className="mt-10 grid place-items-center grid-cols-1 lg:grid-cols-4 gap-10">
                    {restaurants?.map((restaurant:Restaurant) => (
                    <Link href={`/restaurantPage/${restaurant.id}`} key={restaurant.id} className="max-w-[300px] w-full flex flex-col gap-2">
                        <Image className="rounded-md w-full object-cover h-36" src={restaurant.banner || '/images/restaurant-photo.webp'} width={500} height={500} alt="foto do restaurante" />
                        <h6 className="font-bold">{restaurant.name}</h6>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center text-gray-500 gap-2"><FaStar className="text-yellow-400" /> 5.0</span>
                            <span className="text-orange-500 font-bold">{restaurant.type}</span>
                        </div>
                    </Link>
                    ))}
                </div>
                
                <button className="m-auto mt-16 text-xl font-bold p-3 text-white bg-orange-500 rounded-md max-w-48 w-full transition-all duration-500 hover:bg-orange-600">Ver Mais</button>
            </div>
        </>
    )
}