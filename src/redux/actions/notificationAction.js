import {httpGet} from "../../services/httpServices";
import {getNotificationsByUserUrl, getOpenBuyerRequestsUrl} from "../../configurations/urlConfigurations";
import {queryOpenBuyerRequest} from '../actionTypes/sellerActionTypes'
import {resetActionTypes} from "../actionTypes/resetActionTypes";
import {getNotificationsByUserActionType} from "../actionTypes/notificationActionTypes";

export const getNotificationsByUserAction = ({pageNumber, pageSize}) => {
    return httpGet({
        isAuth: true,
        url: `${getNotificationsByUserUrl}${global.userId}/${pageNumber}/${pageSize}`,
        actionTypes: getNotificationsByUserActionType,
    })
}




export const resetNotificationsAction = () => ({
    type: resetActionTypes.RESET_GET_NOTIFICATIONS_REQUEST
})
