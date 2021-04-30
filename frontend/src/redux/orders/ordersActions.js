// import axios from 'axios'
import { LOAD_ORDERS, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_ERROR, UPDATE_ORDER, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_ERROR, DELETE_ORDER, DELETE_ORDER_SUCCESS, DELETE_ORDER_ERROR, ADD_ORDER, ADD_ORDER_ERROR, ADD_ORDER_SUCCESS, EMPTY_ORDERS } from './type'
import { displayNotif } from '../notif/notifActions'
import { emptyBasket } from '../basket/basketActions'

export const loadOrders = () => {
    return {
        type: LOAD_ORDERS
    }
}

export const loadOrdersSuccess = orders => {
    return {
        type: LOAD_ORDERS_SUCCESS,
        payload: orders
    }
}

export const loadOrdersError = error => {
    return {
        type: LOAD_ORDERS_ERROR,
        payload: error
    }
}

export const ordersApiCall = (token) => {
    return dispatch => {
        dispatch(loadOrders())

        fetch('http://127.0.0.1:8000/api/orders/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            if (res.status !== 200) {
                loadOrdersError(res)
            }
            return res.json()
        })
        .then(res => {
            dispatch(loadOrdersSuccess(res))
        })
        .catch(err => {
            dispatch(loadOrdersError(err))
        })
    }
}

export const loadUpdateOrder = () => {
    return {
        type: UPDATE_ORDER
    }
}

export const updateOrderSuccess = order => {
    return {
        type: UPDATE_ORDER_SUCCESS,
        payload: order
    }
}

export const updateOrderError = error => {
    return {
        type: UPDATE_ORDER_ERROR,
        payload: error
    }
}

export const updateOrderApiCall = (order_id, body, token) => {
    return dispatch => {
        dispatch(loadUpdateOrder())

        fetch(`http://127.0.0.1:8000/api/orders/${order_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.status !== 201) {
                console.log(res)
                dispatch(updateOrderError(res))
                dispatch(displayNotif())
            } else {
                console.log(res)
                dispatch(updateOrderSuccess(res))
                dispatch(ordersApiCall(token))
            }
            // return res.json()
        })
        .catch(err => {
            dispatch(updateOrderError(err))
            dispatch(displayNotif())
        })
    }
}

export const deleteOrder = () => {
    return {
        type: DELETE_ORDER
    }
}

export const deleteOrderSuccess = order => {
    return {
        type: DELETE_ORDER_SUCCESS,
        payload: order
    }
}

export const deleteOrderError = error => {
    return {
        type: DELETE_ORDER_ERROR,
        payload: error
    }
}

export const deleteOrderApiCall = (order_id, body, token) => {
    return dispatch => {
        dispatch(deleteOrder())

        fetch(`http://127.0.0.1:8000/api/orders/${order_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.status !== 204) {
                console.log(res)
                dispatch(deleteOrderError(res))
                dispatch(displayNotif())
            } else {
                console.log(res)
                dispatch(deleteOrderSuccess(res))
                dispatch(ordersApiCall(token))
            }
            // return res.json()
        })
        .catch(err => {
            dispatch(deleteOrderError(err))
            dispatch(displayNotif())
        })
    }
}

export const addOrder = () => {
    return {
        type: ADD_ORDER
    }
}

export const addOrderSuccess = order => {
    return {
        type: ADD_ORDER_SUCCESS,
        payload: order
    }
}

export const addOrderError = error => {
    return {
        type: ADD_ORDER_ERROR,
        payload: error
    }
}

export const addOrderApiCall = (body, token) => {
    return dispatch => {
        dispatch(addOrder())

        fetch('http://127.0.0.1:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.status !== 201) {
                console.log(res)
                dispatch(addOrderError(res))
                dispatch(displayNotif())
            } else {
                console.log(res)
                dispatch(addOrderSuccess(res))
                dispatch(ordersApiCall(token))
                dispatch(emptyBasket())
            }
            // return res.json()
        })
        .catch(err => {
            dispatch(addOrderError(err))
            dispatch(displayNotif())
        })
    }
}

export const emptyOrders = () => {
    return {
        type: EMPTY_ORDERS
    }
}