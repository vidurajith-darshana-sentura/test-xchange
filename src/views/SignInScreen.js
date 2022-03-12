import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import TextField from '../components/TextField';
import {greenColor, secondaryColor} from '../styles/constants';
import bgImage from '../assets/linear.jpg';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import * as NavActions from '../navigation/NavActions'
import {resetAuthState, signInAction} from "../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {validateEmailAddress} from "../util/validator";
import Loader from "../components/Loader";
import {showToast} from "../configurations/toastConfigurations";
import {getProfileDetails, resetProfileState, syncFCMAction} from "../redux/actions/profileActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getDeviceFcmToken} from "../util/firebaseMessaging";

const logoIcon = require('../assets/images/icon_logo.webp');

const SignInScreen = () => {

    const dispatch = useDispatch();
    const signInLoading = useSelector(state => state.authState.signInLoading);
    const signInSuccess = useSelector(state => state.authState.signInSuccess);
    const signInError = useSelector(state => state.authState.signInError);
    const profileDetailsLoading = useSelector(state => state.profileState.profileDetailsLoading);
    const profileDetailsSuccess = useSelector(state => state.profileState.profileDetailsSuccess);
    const profileDetailsError = useSelector(state => state.profileState.profileDetailsError);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // handle the sign in part
    useEffect(()=>{

        async function initiateLogin(id,token) {

            const fcm = await getDeviceFcmToken();

            await AsyncStorage.setItem("id",id);
            await AsyncStorage.setItem("email",email);
            await AsyncStorage.setItem("token",token);
            await AsyncStorage.setItem("fcm",fcm);

            dispatch(syncFCMAction({email,fcm}));
            dispatch(getProfileDetails(email));
        }

        if (signInSuccess) {
            const result = signInSuccess.result;
            global.userId = result.id;
            initiateLogin(JSON.stringify(result.id),result.token);
        }
        if (signInError) {
            showToast(signInError);
        }
        dispatch(resetAuthState());
    },[signInSuccess,signInError])

    //get profile details
    useEffect(()=>{
        if (profileDetailsSuccess) {
            console.log("DETAILS: ",profileDetailsSuccess)
            const result = profileDetailsSuccess.result;

            if (!result.verified) {
                showToast({code: 200, result: 'Please check your inbox for verification code!'});
                NavActions.navigate('VerifyEmail');
            } else if (!result.completed ) {
                showToast({code: 200, result: 'Please complete your profile to continue!'});
                NavActions.navigate('UserDetails');
            } else {
                NavActions.navigate('MainTabScreen');
            }
        }

        if (profileDetailsError) {
            showToast(profileDetailsError);
            dispatch(resetProfileState());
        }
    },[profileDetailsSuccess,profileDetailsError])

    // user sign in action
    const handleUserSignIn = () => {
        dispatch(signInAction({email,password}));
    }

    return (
        <ImageBackground source={bgImage} style={styles.contain}>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    {/*logo*/}
                    <Image
                        style={styles.logo}
                        source={logoIcon}/>

                    {/* login content */}
                    <View style={styles.baseForm}>
                        <Text style={{fontSize: 25, paddingHorizontal: 5,}}>Log in</Text>
                        <TextField
                            errorMsg={email && !validateEmailAddress(email) ? 'Please insert a valid email address!' : null}
                            placeholder={'Email Address'}
                            onChangeText={text => setEmail(text)}/>
                        <TextField
                            onChangeText={password => setPassword(password)}
                            placeholder={'Password'}
                            spyMode/>

                        {/* forgot password text */}
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <Text style={styles.forgotPasswordText}> Forgot password ?</Text>
                        </TouchableOpacity>

                        {/* login button and sign up text area */}
                        <View style={{alignContent: 'center', marginTop: 25}}>
                            <Button
                                isDisable={!email || (email && !validateEmailAddress(email)) || !password}
                                onPress={handleUserSignIn}
                                title="LOGIN"
                            />

                            <TouchableOpacity
                                onPress={() => NavActions.navigate('SignUp')}>
                                <Text style={styles.signUpText}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingWrapper>

            {/* loader defined*/}
            <Loader isLoading={signInLoading || profileDetailsLoading}/>

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: "center",
        height: null,
        width: null
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    baseForm: {
        backgroundColor: secondaryColor,
        width: '100%',
        paddingVertical: 25,
        borderRadius: 40,
        paddingHorizontal: 20,
    },
    forgotPasswordText: {
        fontSize: 13,
        color: 'grey',
        textAlign: "right",
        paddingTop: 10,
        paddingBottom: 20
    },
    signUpText: {
        fontSize: 15,
        color: greenColor,
        textAlign: "center",
        paddingTop: 15
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 42,
        marginBottom: 25
    }
});
export default SignInScreen;
