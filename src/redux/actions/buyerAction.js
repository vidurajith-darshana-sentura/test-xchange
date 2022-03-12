import { httpGet, httpPost } from "../../services/httpServices";
import {createBuyerRequestUrl, getOpenSellerRequestsUrl } from "../../configurations/urlConfigurations";
import {getShipmentsRequest, createBuyerRequest, getTravellerRequest} from '../actionTypes/buyerActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";

export const generateBuyerRequest = (data) => {
    return httpPost({
        isAuth: true,
        url: createBuyerRequestUrl,
        actionTypes: createBuyerRequest,
        data
    })
}


export const resetGenerateBuyerRequest = () => ({
    type: resetActionTypes.RESET_CREATE_BUYER_REQUEST
})



export const queryOpenSellerRequest = (pageNumber, rowsPerPage, sellerType, startDate, endDate) => {
    console.log(pageNumber, rowsPerPage, sellerType, startDate, endDate, `${getOpenSellerRequestsUrl}${pageNumber}/${rowsPerPage}/${global.userId}/${sellerType}/${startDate}/${endDate}`)
    return httpGet({
        isAuth: true,
        url: `${getOpenSellerRequestsUrl}${pageNumber}/${rowsPerPage}/${global.userId}/${sellerType}/${startDate}/${endDate}`,
        actionTypes: sellerType === "SHIPMENT" ?  getShipmentsRequest : getTravellerRequest,
    })
}


export const resetQueryShipmentRequests = () => ({
    type: resetActionTypes.RESET_QUERY_SHIPMENT_REQUEST
})



export const resetQueryTravellerRequests = () => ({
    type: resetActionTypes.RESET_QUERY_TRAVELLER_REQUESTS
})
