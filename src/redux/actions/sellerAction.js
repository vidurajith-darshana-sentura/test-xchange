import { httpGet, httpPost } from "../../services/httpServices";
import { createSellerRequestUrl, getOpenBuyerRequestsUrl} from "../../configurations/urlConfigurations";
import { createSellerRequest, queryOpenBuyerRequest} from '../actionTypes/sellerActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";

export const generateSellerRequest = (data) => {
    return httpPost({
        isAuth: true,
        url: createSellerRequestUrl,
        actionTypes: createSellerRequest,
        data
    })
}


export const resetGenerateSellerRequest = () => ({
    type: resetActionTypes.RESET_CREATE_SELLER_REQUEST
})




export const getOpenBuyerRequest = (pageNumber, rowsPerPage, startDate, endDate, country) => {
    console.log(`${getOpenBuyerRequestsUrl}${pageNumber}/${rowsPerPage}/${global.userId}/${startDate}/${endDate}/${country}`)
    return httpGet({
        isAuth: true,
        url: `${getOpenBuyerRequestsUrl}${pageNumber}/${rowsPerPage}/${global.userId}/${startDate}/${endDate}/${country}`,
        actionTypes: queryOpenBuyerRequest,
    })
}


export const resetQueryOpenBuyerRequests = () => ({
    type: resetActionTypes.RESET_QUERY_BUYER_REQUESTS
})
