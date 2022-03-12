import { httpGet } from "../../services/httpServices";
import { createOfferRequestUrl } from "../../configurations/urlConfigurations";
import {getOrdersActionType} from '../actionTypes/orderActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";

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