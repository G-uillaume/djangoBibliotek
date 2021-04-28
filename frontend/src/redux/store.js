import booksReducer from './books/booksReducer'
import notifReducer from './notif/notifReducers'
import basketReducer from './basket/basketReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import ordersReducer from './orders/ordersReducer'

const rootReducer = combineReducers({
    books: booksReducer,
    orders: ordersReducer,
    notif: notifReducer,
    basket: basketReducer,
})


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store