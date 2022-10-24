import { useContext, createContext, useState } from "react";

type CartContextProps = {
    children: any
}

export const defaultCartState = { // Initial State for the cart that will hold the NFTs
    items: [],
    addOneToCart: (itemId: number) => {},
    removeOneFromCart: (itemId: number) => {}
}

export const CartContext = createContext(defaultCartState);

export const CartProvider: React.FC<CartContextProps> = ({children}) => {
    const [cartItems, setCartItems] = useState<[]>([]);

    const addOneToCart = (itemId: number): any => {
        
    }

    const removeOneFromCart = (itemId: number): any => {
        
    }
 
    const cartState = {items: cartItems, addOneToCart, removeOneFromCart}

    return <CartContext.Provider value = {cartState}>
            {children}
    </CartContext.Provider>
}

export const useCart = () => { // useCart custom hook
    const useCart = useContext(CartContext);
    return {cart: useCart};
}