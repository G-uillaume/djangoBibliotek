import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from './type'

const initialState = []

const basketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_BASKET:
            return [
                ...state,
                action.payload
            ]
        case REMOVE_FROM_BASKET:
            state.remove(action.payload)
            return state
        default:
            return state
    }
}

export default basketReducer