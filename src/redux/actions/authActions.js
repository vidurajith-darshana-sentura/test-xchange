import { httpGet, httpPost } from "../../services/httpServices";
import {resendVerifyEmailUrl, signInUrl, signUpUrl, verifyEmailUrl} from "../../configurations/urlConfigurations";
import {
    resendVerifyEmailActionTypes,
    signInActionTypes,
    signUpActionTypes,
    verifyEmailActionTypes
} from "../actionTypes/authActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

//network requests here

export const signInAction = (data) => {
    return httpPost({
        url: signInUrl,
        actionTypes: signInActionTypes,
        data
    })
}

export const signUpAction = (data) => {
    return httpPost({
        url: signUpUrl,
        actionTypes: signUpActionTypes,
        data
    })
}

export const verifyEmailAction = (data) => {
    return httpPost({
        isAuth: true,
        url: verifyEmailUrl,
        actionTypes: verifyEmailActionTypes,
        data
    })
}

export const resendVerifyEmailAction = (email) => {
    return httpPost({
        isAuth: true,
        url: `${resendVerifyEmailUrl}/${email}`,
        actionTypes: resendVerifyEmailActionTypes
    })
}

// static requests here

export const resetAuthState = () => ({
    type: resetActionTypes.RESET_AUTH_ACTION
})


