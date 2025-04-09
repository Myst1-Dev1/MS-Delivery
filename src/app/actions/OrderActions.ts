'use server';

import { CartItem } from "@/hooks/useCart";
import { api } from "@/services/axios";
import { revalidatePath, revalidateTag } from "next/cache";

export async function handleCreateOrder(cart: CartItem[], id: string, user: any, totalCart: any) {
    try {
        if (cart.length === 0) {
            console.log("Carrinho vazio!");
            return;
        }

        const orderProductsName = cart.map(item => item.product.name);
        const orderProductsImage = cart.map(item => item.product.image);
        const orderProductsObservation = cart.map(item => item.observation);

        console.log(orderProductsName, orderProductsImage, orderProductsObservation);

        const res = await api.post("/orders/" + id, {
            userName: user.name,
            address: user.address,
            orderProductsName,
            orderProductsImage,
            orderProductsObservation,
            zipCode: user.zipCode,
            orderValue: totalCart,
            restaurantId: id,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            userId: user.id
        });

        console.log('Pedido criado', res.data);

    } catch (error) {
        console.log('Erro ao criar pedido:', error);
    }

    revalidateTag('orders');

    console.log('Pedido revalidado');
}

// export async function handleSaveOrderOnUser(cart: CartItem[], id:string, restaurantId:string, totalCart:any) {
//     try {
//         if (cart.length === 0) {
//             console.log("Carrinho vazio!");
//             return;
//         }

//         const orderProductsName = cart.map(item => item.product.name);
//         const orderProductsImage = cart.map(item => item.product.image);

//         const res = await api.post("/orders/" + id, {
//             orderProductsName,
//             orderProductsImage,
//             orderValue: totalCart,
//             restaurantId,
//             status: 'Pending',
//             createdAt: new Date().toISOString(),
            
//         });

//         console.log('Pedido criado', res.data);

//     } catch (error) {
//         console.log('Erro ao salvar o pedido no usuário', error);
//     }

//     revalidateTag('orders');
// }

export async function handleUpdateOrder(id:string, status:string) {
    try {
       await api.put(`/orders/updateOrder/${id}`, { status });

       console.log("Pedido atualizado com sucesso!");
    } catch (error) {
        console.log('Erro ao atualizar o pedido');
    }

    revalidateTag('orders');
}