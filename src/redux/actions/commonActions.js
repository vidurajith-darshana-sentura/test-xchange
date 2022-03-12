import { httpGet } from "../../services/httpServices";
import { getCommissionRateUrl } from "../../configurations/urlConfigurations";
import {getCommissionRate} from '../actionTypes/commonActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";

export const queryCommissionRates = () => {
    return httpGet({
        isAuth: true,
        url: getCommissionRateUrl,
        actionTypes: getCommissionRate
    })
}