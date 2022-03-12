import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/configureStore';
import SplashScreen from 'react-native-splash-screen';
import {navigationRef} from "./src/navigation/NavActions";

const App = () => {

  useEffect(()=>{
      setTimeout(()=>{
          SplashScreen.hide();
      },2000)
  },[])

  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <NavigationContainer ref={navigationRef}>
                  <Router />
              </NavigationContainer>
          </PersistGate>
      </Provider>
  )
}

export default App;
