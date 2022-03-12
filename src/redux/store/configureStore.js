import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from '../reducers';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  blacklist: ['authState','profileState','buyerState','sellerState', 'commonState', 'offerState'],
};

const middleWares = [thunk];
const enhancer = applyMiddleware(...middleWares);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    enhancer
)

let persistor = persistStore(store);

export {
  store,
  persistor,
};
