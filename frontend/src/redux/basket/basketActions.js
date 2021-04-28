import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from './type'

export const updateBasket = (book) => {
    return {
        type: ADD_TO_BASKET,
        payload: book
    }
}

export const removeFromBasket = book => {
    return {
        type: REMOVE_FROM_BASKET,
        payload: book
    }
}