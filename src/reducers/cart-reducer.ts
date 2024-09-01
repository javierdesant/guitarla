import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
    { type: 'add-to-cart', payload: {item: Guitar} } |
    { type: 'remove-from-cart', payload: {id: Guitar['id']} } |
    { type: 'decrease-quantity', payload: {id: Guitar['id']} } |
    { type: 'increase-quantity', payload: {id: Guitar['id']} } |
    { type: 'clear-cart', payload: {} }

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}

const MAX_ITEMS = 5
let cart: CartItem[]

export default (state = initialState, { type, payload }: CartActions) => {
  switch (type) {

  case 'add-to-cart':
    cart = []
    const itemExists = state.cart.find(guitar => guitar.id === payload.item.id)
    if (itemExists) {
        cart = state.cart.map(item => {
            if (item.id === payload.item.id && item.quantity < MAX_ITEMS) {
                return {...item, quantity: item.quantity + 1}
            } else {
                return item
            }
        })
    } else {
        const newItem: CartItem = {...payload.item, quantity : 1}
        cart = [...state.cart, newItem]
    }
    return { ...state, cart }

  case 'remove-from-cart':
    cart = state.cart.filter( item => item.id !== payload.id )
    return { ...state, cart }

  case 'decrease-quantity':
    cart = state.cart.map( item => {
        if (item.id === payload.id && item.quantity > 1) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    return { ...state, cart }

  case 'increase-quantity':
    cart = state.cart.map( item => {
        if (item.id === payload.id && item.quantity < MAX_ITEMS) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    return { ...state, cart }
  
  case 'clear-cart':
    cart = []
    return { ...state, cart }

  default:
    return state
  }
}
