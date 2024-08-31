import { useEffect, useState } from "react"
import type { Guitar, CartItem } from "../types"

const useCart = () => {

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map( item => {
            if (item.id === id && item.quantity > 1) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }    

    return {
        cart,
        decreaseQuantity,
        clearCart
    }
}

export default useCart