'use client';

import { api } from "@/services/axios";
import { FetchOrders } from "@/services/fetchData/fetchOrders";
import { queryClient } from "@/services/queryClient";
import { Orders } from "@/types/restaurantDetails";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { CartItem } from "./useCart";
import { handleCreateOrder, handleUpdateOrder } from "@/app/actions/OrderActions";

interface OrdersContextProps {
    order:UseQueryResult<Orders[], Error> | any;
    updateOrder:any;
    createOrder:any;
}

interface OrdersProviderProps {
    children:ReactNode;
}

export const OrdersContext = createContext({} as OrdersContextProps);

export function OrdersProvider({children}:OrdersProviderProps) {
    const id = "67d494cfb882ae0b953823d2";
    
    const order = useQuery({
        queryKey: ['orders'],
        queryFn: async () => FetchOrders(id),
      });
    
    const updateOrder = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            return handleUpdateOrder(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });

    const createOrder = useMutation({
        mutationFn: ({ cart, id, user, totalCart }: { cart: CartItem[]; id: string; user: any; totalCart: any }) =>
            handleCreateOrder(cart, id, user, totalCart),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });    
       
    return (
        <OrdersContext.Provider value={{order, updateOrder, createOrder}}>
            {children}
        </OrdersContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrdersContext);

    return context
}