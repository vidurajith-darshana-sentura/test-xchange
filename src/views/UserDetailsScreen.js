import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import TextField from '../components/TextField';
import {secondaryColor, secondaryDarkColor,} from '../styles/constants';
import bgImage from '../assets/linear.jpg'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import logoIcon from "../assets/images/icon_logo.webp";
import * as NavActions from '../navigation/NavActions';
import Button from "../components/Button";
import CountryPicker from 'react-native-country-picker-modal'
import {validateMobileNumber} from "../util/validator";
import {useDispatch, useSelector} from "react-redux";
import ImagePicker from "../components/ImagePicker";
import {completeProfileAction, resetProfileState} from "../redux/actions/profileActions";
import Loader from "../components/Loader";
import {showToast} from "../configurations/toastConfigurations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userDetailsScreen = () => {

    const dispatch = useDispatch();
    const completeProfileLoading = useSelector(state => state.profileState.completeProfileLoading);
    const completeProfileSuccess = useSelector(state => state.profileState.completeProfileSuccess);
    const completeProfileError = useSelector(state => state.profileState.completeProfileError);

    const [profilePic, setProfilePic] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [country, setCountry] = useState(null);
    const [address, setAddress] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [visibleCountryPicker, setVisibleCountryPicker] = useState(false);

    // handle the actions
    useEffect(()=>{
        if (completeProfileSuccess) {
            showToast({code: 200, result: `Hi ${firstName}, Welcome to XChange Market Place!`});
            NavActions.navigate('MainTabScreen');
        }
        if (completeProfileError) {
            showToast(completeProfileError);
        }
        dispatch(resetProfileState());
    },[completeProfileSuccess, completeProfileError])

    // country selection
    const onSelectCountry = (result) => {
        setCountry(result.name);
        setCountryCode("+"+result.callingCode[0])
    }

    // profile complete action
    const completeProfile = async() => {
        const data = {
            email: await AsyncStorage.getItem('email'),
            profilePic,
            firstName,
            lastName,
            country,
            address,
            postalCode,
            countryCode,
            mobileNumber
        }
        dispatch(completeProfileAction(data));
    }

    return (
        <ImageBackground source={bgImage} style={styles.contain}>

            <CountryPicker
                {...{
                    withFilter: true,
                    withFlag: true,
                    withCountryNameButton: true,
                    withAlphaFilter: true,
                    withCallingCode: true,
                    withEmoji: true,
                    onSelect: onSelectCountry,
                    containerButtonStyle:{display:'none'}
                }}
                visible={visibleCountryPicker}
                onClose={()=>setVisibleCountryPicker(false)}
            />

            <KeyboardAvoidingWrapper>

                <View style={styles.container}>

                    {/*logo*/}
                    <Image
                        style={styles.logo}
                        source={logoIcon}/>

                    {/* base form */}
                    <View style={styles.baseForm}>

                        <View style={{alignItems: 'center'}}>
                            <ImagePicker
                                onCaptureImage={data=>{
                                    if (data) {
                                        setProfilePic({
                                            name: data.fileName,
                                            type: data.type,
                                            uri: data.uri
                                        })
                                    } else {
                                        setProfilePic(null);
                                    }
                                }}
                            />
                        </View>

                        {/* name details */}
                        <Text style={{fontSize: 25, paddingHorizontal: 5,}}>Enter Name Details</Text>

                        <TextField
                            onChangeText={text=>setFirstName(text)}
                            placeholder={'First Name'}
                        />

                        <TextField
                            onChangeText={text=>setLastName(text)}
                            placeholder={'Last Name'}
                        />

                        {/* identity details */}
                        <Text style={{fontSize: 25, paddingHorizontal: 5, paddingTop: 15}}>Enter Identity Details</Text>

                        <TouchableOpacity onPress={()=>setVisibleCountryPicker(true)}>
                            <TextField
                                editable={false}
                                value={country}
                                placeholder={'Country'}
                            />
                        </TouchableOpacity>

                        <TextField
                            onChangeText={text=>setAddress(text)}
                            placeholder={'Address'}
                        />

                        <TextField
                            onChangeText={text=>setPostalCode(text)}
                            placeholder={'Postal Code'}
                        />

                        <TextField
                            editable={false}
                            value={countryCode}
                            placeholder={'Country Code'}
                        />

                        <TextField
                            errorMsg={mobileNumber && !validateMobileNumber(mobileNumber) ? 'Please insert valid mobile number' : null}
                            onChangeText={text=>setMobileNumber(text)}
                            placeholder={'Mobile Number'}
                        />

                        <View style={{alignContent: 'center', marginTop: 25}}>
                            <Button
                                isDisable={!profilePic || !firstName || !lastName || !country || !postalCode || !address || !countryCode || !mobileNumber || (mobileNumber && !validateMobileNumber(mobileNumber))}
                                onPress={completeProfile}
                                title="Complete Profile"
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingWrapper>

            {/* loader defined */}
            <Loader isLoading={completeProfileLoading}/>

        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: "center",
        height: null,
        width: null
    },
    container: {
        paddingTop: 20,
        flex: 1,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    baseForm: {
        backgroundColor: secondaryColor,
        width: '100%',
        paddingVertical: 15,
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
        width: 100,
        height: 100,
        marginTop: -20
    }
});

export default userDetailsScreen;

