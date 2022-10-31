import { useContext, createContext, useState } from "react";
import Cart from '../../../components/Cart';

type CartContextProps = {
    children: any
}

type CartItem = {
    id: number;
    quantity: number;
}

type ICartContext = {
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,

    openCart: () => void,
    closeCart: () => void,

    getCartQuantity: (id: number) => void,
    removeOneFromCart: (id: number) => void,
    cartItems: CartItem[]
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider: React.FC<CartContextProps> = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    const getCartQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0; // Get the cart quantity for that product
    }

    const openCart = () => {
        setIsCartOpen(true);
    }

    const closeCart = () => {
        setIsCartOpen(false);
    }

    const increaseCartQuantity = (id: number) => {

        setCartItems(currItems => {

            if(currItems.find(item => item.id === id) == null) { // if the item id is not there (we do not have any items in the cart)
                return [...currItems, {id, quantity: 1}]
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

        setCartItems(currItems => {

        if(currItems.find(item => item.id === id)?.quantity === 1) { // if the item id is not there (we do not have any items in the cart)
            return currItems.filter(item => item.id !== id) // Return a brand new list of the items
        }

        else {

                return currItems.map(item => {

                    if(item.id === id) { // Otherwise remove 1 to the quantity
                        return {...item, quantity: item.quantity - 1}
                    }

                    else {
                        return item;
                    }

                })
            }

        })
    }

    const removeOneFromCart = (itemId: number) => {
       setCartItems(cartItems.filter(item => item.id !== itemId));
    }
 
    return <CartContext.Provider value = {{increaseCartQuantity, decreaseCartQuantity, removeOneFromCart, cartItems, getCartQuantity, openCart, closeCart}}>

        <Cart isCartOpen = {isCartOpen} />


    </CartContext.Provider>
}

export const useCart = () => { // useCart custom hook
   return useContext(CartContext);
}