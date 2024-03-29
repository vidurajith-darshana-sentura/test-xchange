import { combineReducers } from 'redux'
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import buyerReducer from './buyerReducer';
import sellerReducer from './sellerReducer';
import commonReducer from './commonReducer';
import offerReducer from './offerReducer';

export default combineReducers({
    authState: authReducer,
    profileState: profileReducer,
    buyerState: buyerReducer,
    sellerState: sellerReducer,
    commonState: commonReducer,
    offerState: offerReducer
})
