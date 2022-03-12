import { createSellerRequest, queryOpenBuyerRequest } from "../actionTypes/sellerActionTypes";
import { resetActionTypes } from "../actionTypes/resetActionTypes";

const initialState = {
    isCreatingSellerRequest: false,
    createSellerRequestSuccess: null,
    createSellerRequestFailure: "",

    isQueryingOpenBuyerRequests: false,
    buyerRequests: [],
    queryBuyerRequestFailed: "",

}


export default (state = initialState, action) => {
    switch (action.type) {
        case createSellerRequest.REQUEST_ACTION:
            return {
                isCreatingSellerRequest: true,
                createSellerRequestSuccess: null,
                createSellerRequestFailure: ""
            }
        case createSellerRequest.SUCCESS_ACTION:
            return {
                isCreatingSellerRequest: false,
                createSellerRequestSuccess: action.value,
                createSellerRequestFailure: ""
            }
        case createSellerRequest.FAILED_ACTION:
            return {
                isCreatingSellerRequest: false,
                createSellerRequestFailure: action.value
            }
        case resetActionTypes.RESET_CREATE_SELLER_REQUEST:
            return {
                isCreatingSellerRequest: false,
                createSellerRequestSuccess: null,
                createSellerRequestFailure: ""
            }


        case queryOpenBuyerRequest.REQUEST_ACTION:
            return {
                isQueryingOpenBuyerRequests: true,
                buyerRequests: [],
                queryBuyerRequestFailed: ""
            }
        case queryOpenBuyerRequest.SUCCESS_ACTION:
            let temp = state.buyerRequests ? [...state.buyerRequests] : [];
            console.log("DATA: insingjbg")
            if (action.value && action.value.result && action.value.result.listData) {
                console.log("DATA: ", action.value.result.listData[0])
                temp = temp.concat(action.value.result.listData);
            }

            return {
                isQueryingOpenBuyerRequests: false,
                buyerRequests: temp,
                queryBuyerRequestFailed: ""
            }
        case queryOpenBuyerRequest.FAILED_ACTION:
            return {
                isQueryingOpenBuyerRequests: false,
                buyerRequests: [],
                queryBuyerRequestFailed: action.value
            }
        case resetActionTypes.RESET_QUERY_BUYER_REQUESTS:
            return {
                isQueryingOpenBuyerRequests: false,
                buyerRequests: [],
                queryBuyerRequestFailed: ""
            }
        default:
            return state
    }
}