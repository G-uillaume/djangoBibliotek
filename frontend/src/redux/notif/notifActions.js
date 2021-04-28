import { DISPLAY_NOTIF, HIDE_NOTIF } from './type'

export const displayNotif = () => {
    return {
        type: DISPLAY_NOTIF
    }
}

export const hideNotif = () => {
    return {
        type: HIDE_NOTIF
    }
}
