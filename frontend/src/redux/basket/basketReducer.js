import { ADD_TO_BASKET, EMPTY_BASKET, REMOVE_FROM_BASKET, SET_NUMBER } from './type'

const initialState = {
    basket : [],
    basketFormat: { books: []}
}

const basketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.payload.book],
                basketFormat: { 
                    books: [...state.basketFormat.books, action.payload.bookFormat]
                }
            }
        case REMOVE_FROM_BASKET:
            let copyBasketFormat = [...state.basketFormat.books]
            let indexBookFormat = copyBasketFormat.findIndex(x => x.book_id === action.payload.id)
            copyBasketFormat.splice(indexBookFormat, 1)
            let booksArray = [...state.basket]
            let indexBook = booksArray.findIndex(x => x.id === action.payload.id)
            booksArray.splice(indexBook, 1)
            return {
                ...state,
                basket: booksArray,
                basketFormat: { books: copyBasketFormat }
            }
        case SET_NUMBER:
            let index = state.basketFormat.books.findIndex(x => x.book === action.payload.book_id)
            let copy = [...state.basketFormat.books]
            let book = copy[index]
            book.number = action.payload.number
            copy.splice(index, 1, book)
            return {
                ...state,
                basketFormat: { books: copy }
            }
        case EMPTY_BASKET:
            return {
                ...state,
                basket: [],
                basketFormat: { books: [] }
            }
        default:
            return state
    }
}

export default basketReducer