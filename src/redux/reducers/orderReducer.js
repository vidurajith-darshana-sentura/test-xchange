import {getOrdersByUserActionType, getTrackingMethodsActionType} from "../actionTypes/orderActionTypes";

const initialState = {
    getTrackingMethodsSuccess: null,
    getTrackingMethodsFailed: null,
    getTrackingMethodsLoading: false,

    getOrdersByUserSuccess: null,
    getOrdersByUserFailed: null,
    getOrdersByUserLoading: false,

}


export default (state = initialState, action) => {
    switch (action.type) {
        case getTrackingMethodsActionType.REQUEST_ACTION:
            return {
                getTrackingMethodsSuccess: null,
                getTrackingMethodsFailed: null,
                getTrackingMethodsLoading: true,
            }
        case getTrackingMethodsActionType.SUCCESS_ACTION:
            return {
                getTrackingMethodsSuccess: action.value,
                getTrackingMethodsFailed: null,
                getTrackingMethodsLoading: false,
            }
        case getTrackingMethodsActionType.FAILED_ACTION:
            return {
                getTrackingMethodsSuccess: null,
                getTrackingMethodsFailed: action.value,
                getTrackingMethodsLoading: false,
            }


        case getOrdersByUserActionType.REQUEST_ACTION:
            return {
                getOrdersByUserSuccess: null,
                getOrdersByUserFailed: null,
                getOrdersByUserLoading: true,
            }
        case getOrdersByUserActionType.SUCCESS_ACTION:
            return {
                getOrdersByUserSuccess: action.value,
                getOrdersByUserFailed: null,
                getOrdersByUserLoading: false,
            }
        case getOrdersByUserActionType.FAILED_ACTION:
            return {
                getOrdersByUserSuccess: null,
                getOrdersByUserFailed: action.value,
                getOrdersByUserLoading: false,
            }


        default:
            return state
    }
}
