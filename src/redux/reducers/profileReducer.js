import {completeProfileActionTypes, fcmActionTypes, profileDetailsActionTypes} from "../actionTypes/profileActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {

    syncFCMLoading: false,
    syncFCMSuccess: null,
    syncFCMError: null,

    profileDetailsLoading: false,
    profileDetailsSuccess: null,
    profileDetailsError: null,

    completeProfileLoading: false,
    completeProfileSuccess: null,
    completeProfileError: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        // fcm reducers
        case fcmActionTypes.REQUEST_ACTION:
            return {
                ...state,
                syncFCMLoading: true,
                syncFCMSuccess: null,
                syncFCMError: null
            }
        case fcmActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                syncFCMLoading: false,
                syncFCMSuccess: action.value,
                syncFCMError: null
            }
        case fcmActionTypes.FAILED_ACTION:
            return {
                ...state,
                syncFCMLoading: false,
                syncFCMSuccess: null,
                syncFCMError: action.value
            }

            // get details reducers
        case profileDetailsActionTypes.REQUEST_ACTION:
            return {
                ...state,
                profileDetailsLoading: true,
                profileDetailsSuccess: null,
                profileDetailsError: null
            }
        case profileDetailsActionTypes.SUCCESS_ACTION:
            console.log("PRFLE: ", action.value);
            if(action.value && action.value.result && action.value.result.profileUrl){
                global.profileImage = action.value.result.profileUrl;
            } 
            return {
                ...state,
                profileDetailsLoading: false,
                profileDetailsSuccess: action.value,
                profileDetailsError: null
            }
        case profileDetailsActionTypes.FAILED_ACTION:
            return {
                ...state,
                profileDetailsLoading: false,
                profileDetailsSuccess: null,
                profileDetailsError: action.value
            }

            // complete profile reducers
        case completeProfileActionTypes.REQUEST_ACTION:
            return {
                ...state,
                completeProfileLoading: true,
                completeProfileSuccess: null,
                completeProfileError: null
            }
        case completeProfileActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                completeProfileLoading: false,
                completeProfileSuccess: action.value,
                completeProfileError: null
            }
        case completeProfileActionTypes.FAILED_ACTION:
            return {
                ...state,
                completeProfileLoading: false,
                completeProfileSuccess: null,
                completeProfileError: action.value
            }

        // reset profile actions
        case resetActionTypes.RESET_PROFILE_ACTION:
            console.log("RESET");
            return {
                ...state,
                profileDetailsSuccess: null,
                syncFCMSuccess: null,
                syncFCMError: null,
                profileDetailsError: null,
                completeProfileError: null,
                completeProfileSuccess: null
            }

        default:
            return state
    }
}
