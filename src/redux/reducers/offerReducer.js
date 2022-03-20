import {createOfferRequestActionType, getOffersActionType} from "../actionTypes/offerActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {
   isCreatingOffer: false,
   createOfferSuccess: null,
   createOfferFailed: "",

    getOffersByUserSuccess: null,
    getOffersByUserFailed: null,
    getOffersByUserLoading: false,

}


export default (state = initialState, action) => {
    switch (action.type) {
        case createOfferRequestActionType.REQUEST_ACTION:
            return {
                ...state,
                isCreatingOffer: true,
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
                getOffersByUserSuccess: null,
                getOffersByUserFailed: null,
                getOffersByUserLoading: true,

            }
        case getOffersActionType.SUCCESS_ACTION:

            return {
                ...state,
                getOffersByUserSuccess: action.value,
                getOffersByUserFailed: null,
                getOffersByUserLoading: false,

            }
        case getOffersActionType.FAILED_ACTION:
            return {
                ...state,
                getOffersByUserSuccess: null,
                getOffersByUserFailed: action.value,
                getOffersByUserLoading: false,

            }

        case resetActionTypes.RESET_GET_OFFER_LIST_REQUEST: {
            return {
                ...state,
                getOffersByUserSuccess: null,
                getOffersByUserFailed: null,
                getOffersByUserLoading: false,

                isCreatingOffer: false,
                createOfferSuccess: null,
                createOfferFailed: "",
            }
        }

        default:
            return state;
    }
}
