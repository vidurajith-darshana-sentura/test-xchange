import { httpPost, httpGet } from "../../services/httpServices";
import { createOfferRequestUrl, getOfferListUrl } from "../../configurations/urlConfigurations";
import {createOfferRequestActionType, getOffersActionType} from '../actionTypes/offerActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";

export const createOfferRequest = (data) => {
    return httpPost({
        isAuth: true,
        url: createOfferRequestUrl,
        actionTypes: createOfferRequestActionType,
        data
    })
}

export const getOffersListRequest = (pageNumber, rows) => {
    console.log("jnjrnjrjnrnjr: ", `${getOfferListUrl}${global.userId}/${pageNumber}/${rows}`)
    return httpGet({
        isAuth: true,
        url: `${getOfferListUrl}${global.userId}/${pageNumber}/${rows}`,
        actionTypes: getOffersActionType,
    })
}

export const resetGetOfferListRequest = () => {
    return {
        type: resetActionTypes.RESET_GET_OFFER_LIST_REQUEST
    }
}


export const resetCreateOfferRequest = () => {
    return {
        type: resetActionTypes.RESET_CREATE_OFFER_REQUEST
    }
}