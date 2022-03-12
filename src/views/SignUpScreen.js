import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import TextInput from '../components/TextField';
import {secondaryColor, secondaryDarkColor} from '../styles/constants';
import bgImage from '../assets/linear.jpg';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import * as NavActions from '../navigation/NavActions';
import {validateEmailAddress, validatePassword} from "../util/validator";
import {useDispatch, useSelector} from "react-redux";
import {resetAuthState, signUpAction} from "../redux/actions/authActions";
import Loader from "../components/Loader";
import {showToast} from "../configurations/toastConfigurations";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {syncFCMAction} from "../redux/actions/profileActions";
import {getDeviceFcmToken} from "../util/firebaseMessaging";

const logoIcon = require('../assets/images/icon_logo.webp');

const SignUpScreen = () => {

    const dispatch = useDispatch();
    const signUpLoading = useSelector(state => state.authState.signUpLoading);
    const signUpSuccess = useSelector(state => state.authState.signUpSuccess);
    const signUpError = useSelector(state => state.authState.signUpError);
    const syncFCMLoading = useSelector(state => state.profileState.syncFCMLoading);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    // use to signup the user
    const handleUserSignUp = () => {
        dispatch(signUpAction({email,password}))
    }

    // this will process user signup part
    useEffect(()=>{

        async function initiateLogin(id,token) {

            const fcm = await getDeviceFcmToken();

            await AsyncStorage.setItem("id",id);
            await AsyncStorage.setItem("email",email);
            await AsyncStorage.setItem("token",token);
            await AsyncStorage.setItem("fcm",fcm);

            dispatch(syncFCMAction({email,fcm}));

            showToast({code: 200, result: 'Verification code sent to your mail box!'});
            NavActions.navigate('VerifyEmail');
        }

        if (signUpSuccess) {
            const result = signUpSuccess.result;
            initiateLogin(JSON.stringify(result.id),result.token);
        }

        if (signUpError) {
            showToast(signUpError);
        }

        dispatch(resetAuthState());
    },[signUpSuccess,signUpError])

    return (
        <ImageBackground source={bgImage} style={styles.contain}>
            <KeyboardAvoidingWrapper>
                <View style={styles.container}>

                    {/* logo image */}
                    <Image
                        style={styles.logo}
                        source={logoIcon}
                    />

                    {/* Base Form */}
                    <View style={styles.baseForm}>
                        <Text style={{fontSize: 25, paddingHorizontal: 5,}}>Sign up</Text>
                        <TextInput
                            errorMsg={email && !validateEmailAddress(email) ? 'Please insert a valid email address!' : null}
                            onChangeText={text=>setEmail(text)}
                            placeholder={'Email'}/>
                        <TextInput
                            errorMsg={password && !validatePassword(password) ? 'Minimum 5 with letters and numbers!' : null}
                            onChangeText={text=>setPassword(text)}
                            placeholder={'Password'}
                            spyMode/>
                        <TextInput
                            errorMsg={password && confirmPassword && password !== confirmPassword ? 'Password and confirm password not matched!' : null}
                            onChangeText={text=>setConfirmPassword(text)}
                            placeholder={'Confirm Password'}
                            spyMode/>

                        {/* register button */}
                        <View style={{alignContent: 'center', marginTop: 25,}}>
                            <Button
                                isDisable={!email || (email && !validateEmailAddress(email)) || !password || (password && !validatePassword(password)) || (password !== confirmPassword)}
                                onPress={handleUserSignUp}
                                title="REGISTER"
                            />
                        </View>

                        {/* already have */}
                        <TouchableOpacity
                            onPress={() => NavActions.navigate('SignIn')}>
                            <Text style={styles.alreadyHave}>already have an account</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAvoidingWrapper>

            {/*loader defined*/}
            <Loader isLoading={signUpLoading || syncFCMLoading} />
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
        alignItems: 'center'
    },
    baseForm: {
        backgroundColor: secondaryColor,
        width: '100%',
        paddingVertical: 25,
        borderRadius: 40,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 42,
        marginBottom: 25,
    },
    inputForm: {
        backgroundColor: secondaryDarkColor,
        borderRadius: 8,
        paddingHorizontal: 12,
        color: '#FFF',
        marginBottom: 18,
    },
    buttonRegister: {
        paddingHorizontal: 42,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#20B2AA',
        marginTop: 25
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 42,
        marginBottom: 25
    },
    alreadyHave: {
        fontSize: 15,
        color: '#20B2AA',
        textAlign: "center",
        paddingTop: 15
    }
});

export default SignUpScreen;

