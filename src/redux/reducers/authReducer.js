import {
  resendVerifyEmailActionTypes,
  signInActionTypes,
  signUpActionTypes,
  verifyEmailActionTypes
} from "../actionTypes/authActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {

  signInLoading: false,
  signInSuccess: null,
  signInError: null,
  sessionExpired: false,

  signUpLoading: false,
  signUpSuccess: null,
  signUpError: null,

  verifyEmailLoading: false,
  verifyEmailSuccess: null,
  verifyEmailError: null,

  resendVerifyEmailLoading: false,
  resendVerifyEmailSuccess: null,
  resendVerifyEmailError: null,
}

export default (state = initialState, action) => {
  switch (action.type) {

    // sign in reducers
    case signInActionTypes.REQUEST_ACTION:
      return {
        ...state,
        signInLoading: true,
        signInSuccess: null,
        signInError: null
      }
    case signInActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: action.value,
        signInError: null
      }
    case signInActionTypes.FAILED_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: null,
        signInError: action.value
      }

      // sign up reducers
    case signUpActionTypes.REQUEST_ACTION:
      return {
        ...state,
        signUpLoading: true,
        signUpSuccess: null,
        signUpError: null
      }
    case signUpActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: action.value,
        signUpError: null
      }
    case signUpActionTypes.FAILED_ACTION:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: null,
        signUpError: action.value
      }

      // verify email reducers
    case verifyEmailActionTypes.REQUEST_ACTION:
      return {
        ...state,
        verifyEmailLoading: true,
        verifyEmailSuccess: null,
        verifyEmailError: null
      }
    case verifyEmailActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        verifyEmailLoading: false,
        verifyEmailSuccess: action.value,
        verifyEmailError: null
      }
    case verifyEmailActionTypes.FAILED_ACTION:
      return {
        ...state,
        verifyEmailLoading: false,
        verifyEmailSuccess: null,
        verifyEmailError: action.value
      }

      // resend verify email reducers
    case resendVerifyEmailActionTypes.REQUEST_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: true,
        resendVerifyEmailSuccess: null,
        resendVerifyEmailError: null
      }
    case resendVerifyEmailActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: false,
        resendVerifyEmailSuccess: action.value,
        resendVerifyEmailError: null
      }
    case resendVerifyEmailActionTypes.FAILED_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: false,
        resendVerifyEmailSuccess: null,
        resendVerifyEmailError: action.value
      }

      // session expiration
    case signInActionTypes.SESSION_EXPIRED_ACTION:
      return {
        ...state,
        sessionExpired: true
      }

      // reset authentication actions
    case resetActionTypes.RESET_AUTH_ACTION:
      return {
        ...state,
        signInError: null,
        signInSuccess: null,
        sessionExpired: false,
        signUpError: null,
        signUpSuccess: null,
        verifyEmailError: null,
        verifyEmailSuccess: null,
        resendVerifyEmailError: null,
        resendVerifyEmailSuccess: null
      }

    default:
      return state
  }
}
