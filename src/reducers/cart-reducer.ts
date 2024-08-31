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

export const initialState: CartState = {
    data: db,
    cart: []
}

const MAX_ITEMS = 5
let updatedCart: CartItem[]

export default (state = initialState, { type, payload }: CartActions) => {
  switch (type) {

  case 'add-to-cart':
    updatedCart = []
    const itemExists = state.cart.find(guitar => guitar.id === payload.item.id)
    if (itemExists) {
        updatedCart = state.cart.map(item => {
            if (item.id === payload.item.id && item.quantity < MAX_ITEMS) {
                return {...item, quantity: item.quantity + 1}
            } else {
                return item
            }
        })
    } else {
        const newItem: CartItem = {...payload.item, quantity : 1}
        updatedCart = [...state.cart, newItem]
    }
    return { ...state, cart: updatedCart }

  case 'remove-from-cart':
    updatedCart = state.cart.filter( item => item.id !== payload.id )
    return { ...state, cart: updatedCart }

  case 'decrease-quantity':
    return { ...state, ...payload }

  case 'increase-quantity':
    return { ...state, ...payload }
  
  case 'clear-cart':
    return { ...state, ...payload }

  default:
    return state
  }
}
