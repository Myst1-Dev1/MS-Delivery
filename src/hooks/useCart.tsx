'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FormEvent } from "react";
import { Category } from "@/types/restaurantDetails";

type CartItem = {
  quantity: number;
  product: Category;
  observation:string;
};

type CartContextType = {
  cart: CartItem[];
  handleAddToCart: (id: string, data: Category[], quantity:number) => void;
  handleRemoveToCart: (id: string) => void;
  handleObservationChange:(e:any) => void;
  totalCart:number;
  observation:string;
  setObservation:Dispatch<SetStateAction<string>>
};

type CartProvicerProps = {
    children:ReactNode;
}

export const CartContext = createContext<CartContextType>(
    {} as CartContextType
);

export function CartProvider({ children }:CartProvicerProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [observation, setObservation] = useState('');

  function handleAddToCart(id: string, data: Category[], quantity = 1) {
    const productItem = data?.find((item) => item.id === id);
    if (!productItem) return;
  
    const alreadyInCart = cart.find((cartItem) => cartItem.product.id === id);
  
    const newCart = alreadyInCart
      ? cart.map((cartItem) =>
          cartItem.product.id === id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      : [...cart, { product: productItem, quantity, observation }];
  
    setCart(newCart);
    setObservation("");
  }

  function handleRemoveToCart(id:string) {
    const cartId = cart.filter(item => item.product.id !== id);

    setCart(cartId);
  }

  const handleObservationChange = (e:any) => {
    setObservation(e.target.value);
};

  const totalCart = cart?.reduce((total, current) => {
    return total + (current.product.price * current.quantity)
  }, 0);

  return (
    <CartContext.Provider value={{cart, handleAddToCart, handleRemoveToCart, handleObservationChange, totalCart, observation, setObservation}}>
      {children}
    </CartContext.Provider>
)
};

export function useCart() {
    const context = useContext(CartContext);

    return context
}
