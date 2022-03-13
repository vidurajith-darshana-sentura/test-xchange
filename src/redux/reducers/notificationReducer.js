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
                ...state,
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: true,
            }
        case getNotificationsByUserActionType.SUCCESS_ACTION:
            return {
                ...state,
                getNotificationsByUserSuccess: action.value,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: false,
            }

        case getNotificationsByUserActionType.FAILED_ACTION:
            return {
                ...state,
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: action.value,
                getNotificationsByUserLoading: false,
            }


        case resetActionTypes.RESET_GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                getNotificationsByUserSuccess: null,
                getNotificationsByUserFailed: null,
                getNotificationsByUserLoading: false,
            }
        default:
            return state
    }
}
