import React, {useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import messaging from "@react-native-firebase/messaging";
import {useDispatch, useSelector} from "react-redux";
import {getProfileDetails, resetProfileState, syncFCMAction} from "../redux/actions/profileActions";
import {showToast} from "../configurations/toastConfigurations";
import {useNavigation} from "@react-navigation/native";
import {getDeviceFcmToken} from "../util/firebaseMessaging";

const WelcomeScreen = () =>{

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const syncFCMLoading = useSelector(state => state.profileState.syncFCMLoading);
  const profileDetailsLoading = useSelector(state => state.profileState.profileDetailsLoading);
  const profileDetailsSuccess = useSelector(state => state.profileState.profileDetailsSuccess);
  const profileDetailsError = useSelector(state => state.profileState.profileDetailsError);

  // initial check
  useEffect(()=>{
    async function checkForStoredData() {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      const email = await AsyncStorage.getItem('email');

      const fcm = await AsyncStorage.getItem('fcm');
      const deviceRegisteredFcm = await getDeviceFcmToken();
      console.log(deviceRegisteredFcm)

      if (id && email && token) {
        global.userId = id;
        if (fcm !== deviceRegisteredFcm) {
          dispatch(syncFCMAction({email,fcm: deviceRegisteredFcm}));
        }
        dispatch(getProfileDetails(email));
      } else {
        navigation.navigate('SignIn');
      }
    }

    // process regarding stored data
    checkForStoredData()

    // handle fcm token refresh process
    const unsubscribeTokenRefreshListener = messaging().onTokenRefresh(async fcmToken => {
      const email = await AsyncStorage.getItem('email');
      await AsyncStorage.setItem('fcm', fcmToken);
      syncFCMAction({email,fcm: fcmToken})
    });

    return ()=> unsubscribeTokenRefreshListener();
  },[])

  //get profile details check
  useEffect(()=>{
    if (profileDetailsSuccess) {
      const result = profileDetailsSuccess.result;

      if (!result.verified) {
        showToast({code: 200, result: 'Please check your inbox for verification code!'});
        navigation.navigate('VerifyEmail');
      } else if (!result.completed ) {
        showToast({code: 200, result: 'Please complete your profile to continue!'});
        navigation.navigate('UserDetails');
      } else {
        navigation.navigate('MainTabScreen');
      }
    }

    if (profileDetailsError) {
      showToast(profileDetailsError);
      dispatch(resetProfileState());
    }
  },[profileDetailsSuccess,profileDetailsError])

  return (
      <View>
        <Loader isLoading={syncFCMLoading || profileDetailsLoading}/>
      </View>
  )
}

export default WelcomeScreen;
