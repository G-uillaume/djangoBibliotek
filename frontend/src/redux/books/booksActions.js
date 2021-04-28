import axios from 'axios'
import { LOAD_BOOKS, LOAD_BOOKS_SUCCESS, LOAD_BOOKS_ERROR } from './type'

export const loadBooks = () => {
    return {
        type: LOAD_BOOKS
    }
}

export const loadBooksSucces = books => {
    return {
        type: LOAD_BOOKS_SUCCESS,
        payload: books
    }
}

export const loadBooksError = error => {
    return {
        type: LOAD_BOOKS_ERROR,
        payload: error
    }
}

export const booksApiCall = () => {
    return dispatch => {
        dispatch(loadBooks())

        axios.get('http://127.0.0.1:8000/api/books/')
        .then(res => {
            dispatch(loadBooksSucces(res.data))
        })
        .catch(err => {
            dispatch(loadBooksError(err.message))
        })
    }
}