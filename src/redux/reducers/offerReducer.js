import {createOfferRequestActionType, getOffersActionType} from "../actionTypes/offerActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {
   isCreatingOffer: false,
   createOfferSuccess: null,
   createOfferFailed: "",

   isFetchingOffers: false,
   offerList: [],
   getOffersFailed: ""
}


export default (state = initialState, action) => {
    switch (action.type) {
        case createOfferRequestActionType.REQUEST_ACTION: 
            return {
                ...state,
                isCreatingOffer: false,
                createOfferSuccess: null,
                createOfferFailed: ""
            }
        case createOfferRequestActionType.SUCCESS_ACTION:
            return {
                ...state,
                isCreatingOffer: false,
                createOfferSuccess: action.value,
                createOfferFailed: ""
            }
        case createOfferRequestActionType.FAILED_ACTION: 
            return {
                ...state,
                isCreatingOffer: false,
                createOfferFailed: action.value
            }
        case resetActionTypes.RESET_CREATE_OFFER_REQUEST: {
            return {
                ...state,
                isCreatingOffer: false,
                createOfferSuccess: null,
                createOfferFailed: ""
            }
        }


        
        case getOffersActionType.REQUEST_ACTION: 
            return {
                ...state,
                isFetchingOffers: true,
                offerList: [],
                getOffersFailed: ""
            }
        case getOffersActionType.SUCCESS_ACTION: 
            let temp = state.offerList ? [...state.offerList] : [];
            console.log("DATA: insingjbg")
            if (action.value && action.value.result && action.value.result) {
                temp = temp.concat(action.value.result);
            }

            console.log("DATA: insingjbg", temp)
            return {
                ...state,
                isFetchingOffers: false,
                offerList: temp,
                getOffersFailed: ""
            }
        case getOffersActionType.FAILED_ACTION: 
            return {
                ...state,
                isFetchingOffers: false,
                getOffersFailed: action.value
            }

        case resetActionTypes.RESET_GET_OFFER_LIST_REQUEST: {
            return {
                ...state,
                isFetchingOffers: false,
                offerList: [],
                getOffersFailed: ""
            }
        }

        default: 
            return state;
    }
}
