import { httpGet } from "../../services/httpServices";
import {createOfferRequestUrl, getTrackingMethodsUrl} from "../../configurations/urlConfigurations";
import {getOrdersActionType, getTrackingMethodsActionType} from '../actionTypes/orderActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";
import {createOfferRequestActionType} from "../actionTypes/offerActionTypes";


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
