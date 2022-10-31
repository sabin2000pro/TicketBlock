import { useContext, createContext, useState } from "react";

type CartContextProps = {
    children: any
}

type CartItem = {
    id: number;
    quantity: number;
}

type CartContext = {
    addOneToCart: (id: number) => void,

    openCart: () => void,
    closeCart: () => void,

    getCartQuantity: (id: number) => void,
    removeOneFromCart: (id: number) => void,
    cartItems: CartItem[]
}

export const CartContext = createContext({} as CartContext);

export const CartProvider: React.FC<CartContextProps> = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    const getCartQuantity = () => {

    }

    const openCart = () => {
        setIsCartOpen(true);
    }

    const closeCart = () => {
        setIsCartOpen(false);
    }

    const addOneToCart = (itemId: number): any => {
        
    }

    const removeOneFromCart = (itemId: number): any => {
        
    }
 
    return <CartContext.Provider value = {{addOneToCart, removeOneFromCart, cartItems, getCartQuantity, openCart, closeCart}}>
            {children}
    </CartContext.Provider>
}

export const useCart = () => { // useCart custom hook
    const useCart = useContext(CartContext);
    return {cart: useCart};
}