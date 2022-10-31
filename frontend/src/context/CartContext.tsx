import React, { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number;
}

// Functions for the shopping cart context
type CartContextTypes = {
    openCart: () => void
    closeCart: () => void

    cartQuantity: number;
    cartItems: CartItem[];

    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

export const CartContext = createContext({} as CartContextTypes)

export const CartProvider = ({children}: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState<boolean>(false);

    const openCart = () => {
        setCartOpen(!cartOpen);
    }

    const closeCart = () => {
        setCartOpen(false);
    }

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity! + quantity, 0); // Get the total cart quantity

    const getItemQuantity = (id: number) => {
        return 0;
    }

    const increaseCartQuantity = (id: number) => {

        setCartItems(currItems => {

            if(currItems.find(item => item.id === id) == null) { // if the item id is not there (we do not have any items in the cart)
                return [...currItems, {id, quantity: 1} ]
            }

            else {

                return currItems.map(item => {

                    if(item.id === id) { // Otherwise add 1 to the quantity
                        return {...item, quantity: item.quantity + 1}
                    }

                    else {
                        return item;
                    }


                })
            }

        })
    }

    const decreaseCartQuantity = (id: number) => {

    }

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }

    return <CartContext.Provider value = {{openCart, closeCart, cartQuantity, cartItems, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart}}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}