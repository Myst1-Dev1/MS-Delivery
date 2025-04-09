'use client';

import { About } from "@/components/principal/RestaurantPageContent/About";
import { Categories } from "@/components/principal/RestaurantPageContent/Categories";
import { Testimonials } from "@/components/principal/RestaurantPageContent/Testimonials";
import { Restaurant } from "@/types/restaurantDetails";
import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

interface RestaurantPageContentProps {
    restaurantDetails:Restaurant;
}

export function RestaurantPageContent({ restaurantDetails }:RestaurantPageContentProps) {
    const [activeMenu, setActiveMenu] = useState('categories');

    // Media de estrelas para avaliação do restaurante

    const totalStars = restaurantDetails.avaliations.reduce((acc, aval) => acc + aval.stars, 0);
    const averageStars = (totalStars / restaurantDetails.avaliations.length) || 0;
    const formattedAverage = averageStars.toFixed(1);

    return (
        <>
            <div className="px-4 lg:px-16 py-10">
                <div style={{backgroundImage: `url(${restaurantDetails.banner})`}} className="bg-center w-full h-60 bg-cover rounded-md"></div>
                <div className="mt-5 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <Image src={restaurantDetails.logo} className="w-16 h-16 object-cover rounded-full" width={200} height={200} alt="logo do restaurante"/>
                        <h2 className="text-xl font-bold">{restaurantDetails.name}</h2>
                    </div>
                    <div className="flex gap-3 items-center">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-500">{formattedAverage} ({restaurantDetails.avaliations.length})</span>
                    </div>
                    <div className="flex gap-3 items-center text-gray-500">
                        <FaMapMarkerAlt />
                        <h6 className="font-bold">{restaurantDetails.address}</h6>
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex flex-col gap-3">
                        <div className="bg-[#f4f1f1] max-w-72 justify-center w-full p-2 flex items-center gap-3">
                            <span onClick={() => setActiveMenu('categories')} className={`cursor-pointer font-bold ${activeMenu === 'categories' ? 'bg-orange-500 text-white' : 'text-gray-500'} p-2 text-sm transition-all duration-500 hover:bg-orange-700 hover:text-white`}>Categorias</span>
                            <span onClick={() => setActiveMenu('about')} className={`cursor-pointer font-bold ${activeMenu === 'about' ? 'bg-orange-500 text-white' : 'text-gray-500'} p-2 text-sm transition-all duration-500 hover:bg-orange-700 hover:text-white`}>Sobre</span>
                            <span onClick={() => setActiveMenu('testimonials')} className={`cursor-pointer font-bold ${activeMenu === 'testimonials' ? 'bg-orange-500 text-white' : 'text-gray-500'} p-2 text-sm transition-all duration-500 hover:bg-orange-700 hover:text-white`}>Avaliações</span>
                        </div>
                    </div>

                    {activeMenu === 'categories' ? <Categories options={restaurantDetails.menuOptions} dishes={restaurantDetails.dishes} id={restaurantDetails.id} /> : ''}
                    {activeMenu === 'about' ? <About about={restaurantDetails.description} /> : ''}
                    {activeMenu === 'testimonials' ? <Testimonials avaliation = {restaurantDetails.avaliations} /> : ''}
                </div>
            </div>
        </>
    )
}