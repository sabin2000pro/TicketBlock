import React, { createContext, ReactNode, useState } from "react";

type CartProviderProps = {
    children: ReactNode
}

type CartItems = {
    itemId: number;
    itemQuantity: number;
}

// Functions for the shopping cart context
type CartContextTypes = {
    openCart: () => void
    closeCart: () => void

    cartQuantity: number;
    cartItems: CartItems[];

    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}


export const CartContext = createContext({} as CartContextTypes)

export const CartProvider = ({children}: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const openCart = () => {
        setCartOpen(!cartOpen);
    }

    const closeCart = () => {
        setCartOpen(false);
    }

    const cartQuantity = cartItems.reduce((quantity, item) => item.itemQuantity + quantity, 0); // Get the total cart quantity

    const getItemQuantity = (id: number | undefined): number => {
        return 0;
    }

    const increaseCartQuantity = (id: number) => {

    }

    const decreaseCartQuantity = (id: number) => {

    }

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.itemId !== id));
    }

    return <CartContext.Provider value = {{openCart, closeCart, cartQuantity, cartItems, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
        {children}
    </CartContext.Provider>
}