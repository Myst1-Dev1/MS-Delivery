'use client';

import { useRestaurant } from "@/hooks/useRestaurant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function Search() {
    const { restaurant, isFetching } = useRestaurant();
    const [search, setSearch] = useState('');

    const filterRestaurant = restaurant?.filter((rest:any) => rest.name.toLowerCase().includes(search.toLowerCase()));

    useGSAP(() => {
        gsap.fromTo('.search', { opacity:0 }, { opacity:1, ease:'sine' });
    }, []);

    return (
        <>
            <div className="search w-full min-h-screen bg-white z-50 fixed top-0 left-0 right-0">
                <div className="p-3">
                    <div className="flex items-center gap-3 justify-between border border-gray-300 p-3 w-full">
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="outline-none w-full" placeholder="Pesquise por um restaurante" />
                        <FaSearch className="text-gray-400" />
                    </div>
                    <div className="mt-3">
                        {isFetching ? (
                            <p className="text-center p-4 text-gray-500">Carregando...</p>
                            ) : search !== '' ? (
                            filterRestaurant?.map((rest: any) => (
                                <Link
                                key={rest.id}
                                className="p-3 border border-gray-200 flex items-center justify-between transition-all duration-500 hover:bg-orange-500 hover:text-white"
                                href={`/restaurantPage/${rest.id}`}
                                >
                                <div className="flex flex-col gap-3">
                                    <h6 className="text-xl">{rest.name}</h6>
                                    <span className="font-thin">{rest.type}</span>
                                </div>
                                <Image
                                    className="w-12 h-12 object-cover rounded-full"
                                    src={rest.logo || "/images/cheddar-burguer.jpg"}
                                    width={200}
                                    height={200}
                                    alt="logo do restaurante"
                                />
                                </Link>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}