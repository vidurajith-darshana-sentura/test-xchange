import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import {greenColor, secondaryColor, secondaryDarkColor} from '../styles/constants';
import bgImage from '../assets/linear.jpg'
import * as NavActions from '../navigation/NavActions';
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {resendVerifyEmailAction, resetAuthState, verifyEmailAction} from "../redux/actions/authActions";
import {showToast} from "../configurations/toastConfigurations";
import logoIcon from "../assets/images/icon_logo.webp";

const VerifyEmailScreen = () => {

    const dispatch = useDispatch();
    const verifyEmailLoading = useSelector(state => state.authState.verifyEmailLoading);
    const verifyEmailSuccess = useSelector(state => state.authState.verifyEmailSuccess);
    const verifyEmailError = useSelector(state => state.authState.verifyEmailError);
    const resendVerifyEmailLoading = useSelector(state => state.authState.resendVerifyEmailLoading);
    const resendVerifyEmailSuccess = useSelector(state => state.authState.resendVerifyEmailSuccess);
    const resendVerifyEmailError = useSelector(state => state.authState.resendVerifyEmailError);

    const [verifyCode,setVerifyCode] = useState('');

    // actions based on results
    useEffect(()=>{
        // email verification result
        if (verifyEmailSuccess) {
            showToast({code: 200, result: 'Please complete your profile to continue!'});
            NavActions.navigate('UserDetails');
        }
        if (verifyEmailError) {
            setVerifyCode('');
            showToast(verifyEmailError);
        }

        // resend verify email result
        if (resendVerifyEmailSuccess) {
            setVerifyCode('');
            showToast({code: 200, result: 'Verify code resent!'});
        }
        if (resendVerifyEmailError) {
            showToast(resendVerifyEmailError);
        }

        dispatch(resetAuthState());
    },[verifyEmailSuccess,verifyEmailError,resendVerifyEmailSuccess,resendVerifyEmailError])

    // use to send verify code
    const handleVerification = async() => {
        const email = await AsyncStorage.getItem('email');
        dispatch(verifyEmailAction({email,verifyCode}));
    }

    // use to resend verify email
    const resendVerifyEmail = async() => {
        const email = await AsyncStorage.getItem('email');
        dispatch(resendVerifyEmailAction(email));
    }

    return (
        <ImageBackground source={bgImage} style={styles.contain}>
            <View style={styles.container}>

                {/*logo*/}
                <Image
                    style={styles.logo}
                    source={logoIcon}/>

                {/* form data */}
                <View style={styles.baseForm}>
                    <Text style={{fontSize: 25, textAlign: "center"}}>Verify Your Email</Text>
                    <Text style={styles.description}>
                        Please enter the code we sent to your@gmail.com
                    </Text>

                    {/* verify code boxes */}
                    <View style={{flex: 1,paddingTop: 100,justifyContent: 'center'}}>
                        <OTPInputView
                            style={{width: '100%', height: 200,marginTop: -50}}
                            pinCount={6}
                            code={verifyCode}
                            codeInputHighlightStyle={{borderWidth: 1, borderColor: greenColor}}
                            codeInputFieldStyle={{color: 'black'}}
                            onCodeChanged={code=>setVerifyCode(code)}
                        />
                    </View>

                    {/* didn't receive code */}
                    <Text style={styles.didntReceiveText}>Didn't receive any code ?</Text>
                    <TouchableOpacity onPress={resendVerifyEmail}>
                        <Text style={styles.resendCodeText}>Resend code</Text>
                    </TouchableOpacity>

                    {/* verify button */}
                    <View style={{alignContent: 'center', marginTop: 25}}>
                        <Button
                            isDisable={!verifyCode}
                            onPress={handleVerification}
                            title="VERIFY"
                        />
                    </View>
                </View>
            </View>

            {/*loader defined*/}
            <Loader isLoading={verifyEmailLoading || resendVerifyEmailLoading}/>

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
        paddingTop: 100,
    },
    description: {
        fontSize: 15,
        color: 'grey',
        textAlign: "center",
        paddingTop: 20
    },
    baseForm: {
        backgroundColor: secondaryColor,
        width: '100%',
        paddingVertical: 65,
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
        marginTop: 70
    },
    verifyCode: {
        backgroundColor: "#f5f4f2",
        fontWeight: "600",
        alignSelf: "center",
        padding: 10,
        fontSize: 15,
        height: 37,
        width: "11%",
        borderRadius: 10,
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#20B2AA"
    },
    didntReceiveText: {
        fontSize: 15,
        color: 'grey',
        textAlign: "center",
        paddingTop: 50
    },
    resendCodeText: {
        fontSize: 15,
        color: greenColor,
        textAlign: "center",
        paddingTop: 5
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: -70
    }
});
export default VerifyEmailScreen;
