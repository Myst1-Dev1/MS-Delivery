'use client';

import { FetchOrders } from "@/services/fetchData/fetchOrders";
import { queryClient } from "@/services/queryClient";
import { Orders } from "@/types/restaurantDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { CartItem, useCart } from "./useCart";
import { useRestaurant } from "./useRestaurant";
import { useUser } from "./useUser";
import { api } from "@/services/axios";

interface OrdersContextProps {
    order:Orders[] | any;
    updateOrder:any;
    createOrder:any;
    id:string;
    isFetching:boolean;
}

interface OrdersProviderProps {
    children:ReactNode;
}

export const OrdersContext = createContext({} as OrdersContextProps);

export function OrdersProvider({children}:OrdersProviderProps) {
    const { restaurant } = useRestaurant();
    const { cart } = useCart();
    const { user } = useUser();

    const restaurantIdFromCart = cart.length > 0 ? cart[0].restaurantId : null;
    const restaurantIdFromUser = restaurant?.find((r: any) => r.userId === user?.id)?.id;

    // Se estiver no checkout, usa o ID do carrinho, senão, usa o do usuário logado.
    const id = restaurantIdFromCart || restaurantIdFromUser;

    async function handleCreateOrder(cart: CartItem[], id: string, user: any, totalCart: any) {
        try {
            if (cart.length === 0) {
                console.log("Carrinho vazio!");
                return;
            }
    
            const orderProductsName = cart.map(item => item.product.name);
            const orderProductsImages = cart.map(item => item.product.image);
            const orderProductsObservation = cart.map(item => item.observation);
    
            await api.post("/orders/" + id, {
                userName: user.name,
                address: user.address,
                orderProductsName,
                orderProductsImages,
                orderProductsObservation,
                zipCode: user.zipCode,
                orderValue: totalCart,
                restaurantId: id,
                status: 'Pending',
                createdAt: new Date().toISOString(),
                userId: user.id
            });
    
        } catch (error) {
            console.log('Erro ao criar pedido:', error);
            return Promise.reject(error);
        }
    }

    async function handleUpdateOrder(id:string, status:string) {
        try {
           const res = await api.put(`/orders/updateOrder/${id}`, { status });

           console.log("Pedido atualizado com sucesso!", res.data);
        } catch (error) {
            console.log('Erro ao atualizar o pedido');
        }
    
    }

    const { data:order, isFetching } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => FetchOrders(id),
        enabled: !!id,
        refetchInterval: 3000,
    }) ?? [];
    
    const updateOrder = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            return handleUpdateOrder(id, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });

            setTimeout(() => {
                queryClient.refetchQueries({ queryKey: ['orders'] });
            }, 3000);
        }
    });

    const createOrder = useMutation({
        mutationFn: ({ cart, id, user, totalCart }: { cart: CartItem[]; id: string; user: any; totalCart: any }) =>
            handleCreateOrder(cart, id, user, totalCart),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
    });    
       
    return (
        <OrdersContext.Provider value={{order, updateOrder, createOrder, id, isFetching}}>
            {children}
        </OrdersContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrdersContext);

    return context
}