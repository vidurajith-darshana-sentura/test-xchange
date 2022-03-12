import messaging from "@react-native-firebase/messaging";

export const getDeviceFcmToken = async() =>{
    return await messaging().getToken();
}
