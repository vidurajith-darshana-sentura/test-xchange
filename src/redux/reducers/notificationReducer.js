import {resetActionTypes} from "../actionTypes/resetActionTypes";
import {getNotificationsByUserActionType} from "../actionTypes/notificationActionTypes";

const initialState = {
    getNotificationsByUserSuccess: null,
    getNotificationsByUserFailed: null,
    getNotificationsByUserLoading: false,

}


export default (state = initialState, action) => {
    switch (action.type) {
        case getNotificationsByUserActionType.REQUEST_ACTION:
            return {
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: true,
            }
        case getNotificationsByUserActionType.SUCCESS_ACTION:
            return {
                getNotificationsByUserSuccess: action.value,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: false,
            }

        case getNotificationsByUserActionType.FAILED_ACTION:
            return {
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: action.value,
                getNotificationsByUserLoading: false,
            }


        case resetActionTypes.RESET_GET_NOTIFICATIONS_REQUEST:
            return {
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: false,
            }
        default:
            return state
    }
}
