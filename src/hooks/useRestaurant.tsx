'use client';

import { Restaurant } from "@/types/restaurantDetails";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { FetchRestaurants } from "@/services/fetchData/fetchRestaurants";

interface RestaurantContextProps {
    restaurant:UseQueryResult<Restaurant[], Error> | any;
}

interface RestaurantProviderProps {
    children:ReactNode;
}

export const RestaurantContext = createContext({} as RestaurantContextProps);

export function RestaurantProvider({children}:RestaurantProviderProps) {
    const { data:restaurant } = useQuery({
        queryKey: ['Restaurant'],
        queryFn: async () => FetchRestaurants(),
    });
       
    return (
        <RestaurantContext.Provider value={{restaurant}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export function useRestaurant() {
    const context = useContext(RestaurantContext);

    return context
}