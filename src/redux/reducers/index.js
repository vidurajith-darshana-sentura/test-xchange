import { combineReducers } from 'redux'
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import buyerReducer from './buyerReducer';
import sellerReducer from './sellerReducer';
import commonReducer from './commonReducer';
import offerReducer from './offerReducer';
import notificationReducer from './notificationReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    authState: authReducer,
    profileState: profileReducer,
    buyerState: buyerReducer,
    sellerState: sellerReducer,
    commonState: commonReducer,
    offerState: offerReducer,
    notificationState: notificationReducer,
    orderState: orderReducer,
})
