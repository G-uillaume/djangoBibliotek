import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from './type'

const initialState = {
    isLoading: false,
    user: [],
    error: ''
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: ''
            }
        case REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                user: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default usersReducer