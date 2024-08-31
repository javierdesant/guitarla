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

export default (state = initialState, { type, payload }: CartActions) => {
  switch (type) {

  case 'add-to-cart':
    return { ...state, ...payload }

  case 'remove-from-cart':
    return { ...state, ...payload }

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
