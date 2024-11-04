'use client';

import { About } from "@/components/principal/RestaurantPageContent/About";
import { Categories } from "@/components/principal/RestaurantPageContent/Categories";
import { Testimonials } from "@/components/principal/RestaurantPageContent/Testimonials";
import { RestaurantDetails } from "@/types/restaurantDetails";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

interface RestaurantPageContentProps {
    restaurantDetails:RestaurantDetails[];
}

export function RestaurantPageContent({ restaurantDetails }:RestaurantPageContentProps) {
    const [activeMenu, setActiveMenu] = useState('categories');

    console.log(restaurantDetails);

    return (
        <>
            {restaurantDetails?.map(detail => (
            <div key={detail.id} className="px-4 lg:px-16 py-10">
                <div style={{backgroundImage: `url(${detail.banner.url})`}} className="bg-center w-full h-60 bg-cover rounded-md"></div>
                <div className="mt-5 flex flex-col gap-2">
                    <h2 className="text-xl font-bold">{detail.title}</h2>
                    <div className="flex gap-3 items-center">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-500">5.0 (3)</span>
                    </div>
                    <div className="flex gap-3 items-center text-gray-500">
                        <FaMapMarkerAlt />
                        <h6 className="font-bold">{detail.address}</h6>
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

                    {activeMenu === 'categories' ? <Categories data={detail.categorie} type={detail.foodTypes} /> : ''}
                    {activeMenu === 'about' ? <About about={detail.about} /> : ''}
                    {activeMenu === 'testimonials' ? <Testimonials /> : ''}
                </div>
            </div>))}
        </>
    )
}