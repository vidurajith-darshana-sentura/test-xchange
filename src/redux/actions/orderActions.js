import { httpGet } from "../../services/httpServices";
import {
    createOfferRequestUrl,
    getNotificationsByUserUrl,
    getOrdersByUserUrl,
    getTrackingMethodsUrl
} from "../../configurations/urlConfigurations";
import {
    getOrdersActionType,
    getOrdersByUserActionType,
    getTrackingMethodsActionType
} from '../actionTypes/orderActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";
import {createOfferRequestActionType} from "../actionTypes/offerActionTypes";


export const getOrdersByUserAction = ({pageNumber, pageSize}) => {
    return httpGet({
        isAuth: true,
        url: `${getOrdersByUserUrl}${global.userId}/${pageNumber}/${pageSize}`,
        actionTypes: getOrdersByUserActionType,
    })
}

export const getTrackingMethodsAction = () => {
    return httpGet({
        isAuth: true,
        url: getTrackingMethodsUrl,
        actionTypes: getTrackingMethodsActionType,
    })
}


export const getOrderList = (data) => {
    return httpGet({
        isAuth: true,
        url: createOfferRequestUrl,
        actionTypes: createOfferRequestActionType,
        data
    })
}

export const resetCreateOfferRequest = () => {
    return {
        type: resetActionTypes.RESET_CREATE_OFFER_REQUEST
    }
}
