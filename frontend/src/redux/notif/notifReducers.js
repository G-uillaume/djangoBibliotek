import { DISPLAY_NOTIF, HIDE_NOTIF } from './type'

const initialState = ({
    notif: null,
    msg: 'Something went wrong, please try again'
})

const notifReducer = (state = initialState, action) => {
    switch(action.type) {
        case DISPLAY_NOTIF:
            return {
                ...state,
                notif: true,
            }
        case HIDE_NOTIF:
            return {
                ...state,
                notif: null
            }
        default:
            return state
    }
}

export default notifReducer