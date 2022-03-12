import {getTrackingMethodsActionType} from "../actionTypes/orderActionTypes";

const initialState = {
    getTrackingMethodsSuccess: null,
    getTrackingMethodsFailed: null,
    getTrackingMethodsLoading: false,

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


        default:
            return state
    }
}
