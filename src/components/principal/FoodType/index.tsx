'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
 
const foodTypeData = [
    {
        id:1,
        image:'/images/allFoods.webp',
        name:'Todos'
    },
    {
        id:2,
        image:'/images/burguer.webp',
        name:'Burguer'
    },
    {
        id:3,
        image:'/images/pizza.webp',
        name:'Pizza'
    },
    {
        id:4,
        image:'/images/japanese-food.webp',
        name:'Japonesa'
    },
    {
        id:5,
        image:'/images/salad-food.webp',
        name:'Saladas'
    },
    {
        id:6,
        image:'/images/sweet.webp',
        name:'Doces'
    },
    {
        id:7,
        image:'/images/mexican-food.webp',
        name:'Mexicana'
    },
    {
        id:8,
        image:'/images/barbecue.webp',
        name:'Churrasco'
    },
    {
        id:9,
        image:'/images/brazilian-food.webp',
        name:'Brasileira'
    },
    {
        id:10,
        image:'/images/vegan-food.webp',
        name:'Vegana'
    },
    {
        id:11,
        image:'/images/lunchbox.webp',
        name:'Marmitas'
    },
    {
        id:12,
        image:'/images/drinks.webp',
        name:'Bebidas'
    },
]

export function FoodType() {

    return (
        <>
            <div className="relative overflow-hidden m-auto max-w-4xl lg:max-w-7xl 2xl:max-w-full px-4 lg:px-16 py-16">
                <motion.div
                    className="flex gap-7"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ repeat: Infinity, repeatType:'mirror', duration: 10, ease: "linear" }}
                >
                    {[...foodTypeData, ...foodTypeData].map((food, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-20 h-20 cursor-pointer flex justify-center items-center flex-col gap-3 p-3 border border-gray-500 rounded-md transition-all duration-500 hover:bg-orange-500 hover:border-none hover:text-white"
                    >
                        <Image
                        className="w-14 h-10 flex-shrink-0 object-cover"
                        src={food.image}
                        width={500}
                        height={400}
                        alt="tipo de comida"
                        />
                        <h6 className="font-bold text-sm">{food.name}</h6>
                    </div>
                    ))}
                </motion.div>
            </div>
        </>
    )
}