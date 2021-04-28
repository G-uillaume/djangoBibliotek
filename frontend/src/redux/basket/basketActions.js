import { ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_NUMBER } from './type'

export const updateBasket = (book) => {
    let bookFormat = { book_id: book.id, book_title: book.title, number: 1}
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