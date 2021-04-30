import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './type'
import { displayNotif } from '../notif/notifActions'

export const registerUser = () => {
    return {
        type: REGISTER_USER
    }
}

export const registerUserSuccess = user => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: user
    }
}

export const registerUserError = error => {
    return {
        type: REGISTER_USER_ERROR,
        payload: error
    }
}

export const registerUserApiCall = (body) => {
    return dispatch => {
        dispatch(registerUser())

        fetch('http://127.0.0.1:8000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.status !== 201) {
                console.log(res)
                dispatch(registerUserError(res))
                dispatch(displayNotif())
            } else {
                console.log(res)
                dispatch(registerUserSuccess(res))
            }
            // return res.json()
        })
        .catch(err => {
            dispatch(registerUserError(err))
            dispatch(displayNotif())
        })
    }
}