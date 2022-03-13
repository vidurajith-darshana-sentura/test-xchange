import {getShipmentsRequest, createBuyerRequest, getTravellerRequest} from "../actionTypes/buyerActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {
    isCreatingBuyerRequest: false,
    createBuyerRequestSuccess: null,
    createBuyerRequestFailure: "",

    isQueryingOpenSellerRequests: false,
    shipmentRequests: [],
    queryShipmentRequestFailed: "",

    travellerRequests: [],

}


export default (state = initialState, action) => {
    switch (action.type) {
        case createBuyerRequest.REQUEST_ACTION :
            return {
                ...state,
                isCreatingBuyerRequest: true,
                createBuyerRequestSuccess: null,
                createBuyerRequestFailure: ""
            }
        case createBuyerRequest.SUCCESS_ACTION :
            return {
                ...state,
                isCreatingBuyerRequest: false,
                createBuyerRequestSuccess: action.value,
                createBuyerRequestFailure: ""
            }
        case createBuyerRequest.FAILED_ACTION :
            return {
                ...state,
                isCreatingBuyerRequest: false,
                createBuyerRequestSuccess: null,
                createBuyerRequestFailure: action.value
            }
        case resetActionTypes.RESET_CREATE_BUYER_REQUEST :
            return {
                ...state,
                isCreatingBuyerRequest: false,
                createBuyerRequestSuccess: null,
                createBuyerRequestFailure: ""
            }



        case getShipmentsRequest.REQUEST_ACTION :
            console.log("SCKNJV: rwdhbf ")
            return {
                ...state,
                isQueryingOpenSellerRequests: true,
                shipmentRequests: [],
                queryShipmentRequestFailed: ""
            }
        case getShipmentsRequest.SUCCESS_ACTION :
            let temp = state.shipmentRequests ? [...state.shipmentRequests] : [];
            if(action.value && action.value.result && action.value.result.listData){
                console.log("DATA: ", action.value.result.listData[0])
                temp = temp.concat(action.value.result.listData);
            }

            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                shipmentRequests: temp,
                queryShipmentRequestFailed: ""
            }
        case getShipmentsRequest.FAILED_ACTION :
            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                shipmentRequests: [],
                queryShipmentRequestFailed: action.value
            }
        case resetActionTypes.RESET_QUERY_SHIPMENT_REQUEST :
            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                shipmentRequests: [],
                queryShipmentRequestFailed: ""
            }


        case getTravellerRequest.REQUEST_ACTION :
            return {
                ...state,
                isQueryingOpenSellerRequests: true,
                travellerRequests: [],
                queryShipmentRequestFailed: ""
            }
        case getTravellerRequest.SUCCESS_ACTION :
            let prevTravellerRequests = state.travellerRequests ? [...state.travellerRequests] : [];
            if(action.value && action.value.result && action.value.result.listData){
                prevTravellerRequests = prevTravellerRequests.concat(action.value.result.listData);
            }

            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                travellerRequests: prevTravellerRequests,
                queryShipmentRequestFailed: ""
            }
        case getTravellerRequest.FAILED_ACTION :
            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                travellerRequests: [],
                queryShipmentRequestFailed: action.value
            }
        case resetActionTypes.RESET_QUERY_TRAVELLER_REQUESTS :
            return {
                ...state,
                isQueryingOpenSellerRequests: false,
                travellerRequests: [],
                queryShipmentRequestFailed: ""
            }
        default:
            return state
    }
}
