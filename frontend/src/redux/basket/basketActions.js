import { ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_NUMBER } from './type'

export const updateBasket = (book) => {
    let bookFormat = { book: book.id, number: 1}
    return {
        type: ADD_TO_BASKET,
        payload: { book, bookFormat }
    }
}

export const removeFromBasket = book => {
    return {
        type: REMOVE_FROM_BASKET,
        payload: book
    }
}

export const setNumber = (book_id, number) => {
    return {
        type: SET_NUMBER,
        payload: { book_id, number}
    }
}

export const emptyBasket = () => {
    return {
        type: EMPTY_BASKET
    }
}