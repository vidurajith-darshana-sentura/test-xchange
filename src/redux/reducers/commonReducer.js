import {getCommissionRate} from "../actionTypes/commonActionTypes";
import {resetActionTypes} from "../actionTypes/resetActionTypes";

const initialState = {
   commissionRate: 0
}


export default (state = initialState, action) => {
    switch (action.type) {
        case getCommissionRate.REQUEST_ACTION: 
            return {
                ...state,
                commissionRate: 0
            }
        case getCommissionRate.SUCCESS_ACTION: 
            return {
                ...state,
                commissionRate: action.value && action.value.result ? action.value.result : 0
            }
        case getCommissionRate.FAILED_ACTION: 
            return {
                ...state,
            }

        default: 
            return state;
    }
}
