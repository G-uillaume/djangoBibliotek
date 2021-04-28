import { LOAD_ORDERS, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_ERROR, UPDATE_ORDER, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_ERROR, DELETE_ORDER, DELETE_ORDER_SUCCESS, DELETE_ORDER_ERROR } from './type'

const initialOrdersState = {
    ordersIsLoading: false,
    orders: [],
    ordersError: '',
    updateIsLoading: false,
    updatedOrder: [],
    updatedOrderError: '',
    deleteIsLoading: false,
    deleteOrderError: ''
}

const ordersReducer = (state = initialOrdersState, action) => {
    switch(action.type) {
        case LOAD_ORDERS:
            return {
                ...state,
                ordersIsLoading: true
            }
        case LOAD_ORDERS_SUCCESS:
            return {
                ...state,
                ordersIsLoading: false,
                orders: action.payload,
                ordersError: ''
            }
        case LOAD_ORDERS_ERROR:
            return {
                ...state,
                ordersIsLoading: false,
                orders: [],
                ordersError: action.payload
            }
        case UPDATE_ORDER:
            return {
                ...state,
                updateIsLoading: true
            }
        case UPDATE_ORDER_SUCCESS:
            let index = state.orders.findIndex(x => x.id === action.payload.id)
            return {
                ...state,
                // orders : [...state.orders.slice(0, index), action.payload, ...state.orders.slice(index+1)],
                updateIsLoading: false,
                updatedOrder: action.payload,
                updatedOrderError: ''
            }
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                updateIsLoading: false,
                updatedOrder: [],
                updatedOrderError: action.payload
            }
        case DELETE_ORDER:
            return {
                ...state,
                deleteIsLoading: true
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                deleteIsLoading: false,
                deleteOrderError: ''
            }
        case DELETE_ORDER_ERROR:
            return {
                ...state,
                deleteIsLoading: false,
                deleteOrderError: action.payload
            }
        default:
            return state
    }
}

export default ordersReducer