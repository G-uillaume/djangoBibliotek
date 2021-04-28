import { LOAD_BOOKS, LOAD_BOOKS_SUCCESS, LOAD_BOOKS_ERROR } from './type'

const initialBooksState = {
    isLoading: false,
    books: [],
    error: ''
}

const booksReducer = (state = initialBooksState, action) => {
    switch(action.type) {
        case LOAD_BOOKS:
            return {
                ...state,
                isLoading: true
            }
        case LOAD_BOOKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                books: action.payload,
                error: ''
            }
        case LOAD_BOOKS_ERROR:
            return {
                ...state,
                isLoading: false,
                books: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default booksReducer