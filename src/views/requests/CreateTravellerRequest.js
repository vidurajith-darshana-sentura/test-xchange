import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import InputForm from '../../components/TextField';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Checkbox } from 'react-native-paper';
import { greenColor } from '../../styles/constants';
import { useDispatch, useSelector } from 'react-redux';
import { generateSellerRequest, resetGenerateSellerRequest } from '../../redux/actions/sellerAction';
import Loader from "../../components/Loader";
import { showToast } from '../../configurations/toastConfigurations';
import CountryPicker from 'react-native-country-picker-modal'
import {Calendar} from "react-native-calendars"

let doSetDeliveryCountry = false;


const CreateTravellerRequest = ({ navigation }) => {
    const [checked, setChecked] = React.useState(false);

    const [title, setTitle] = useState("LOREM");
    const [description, setDescription] = useState("orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum");
    const [travellerDate, setTravellerDate] = useState(null);
    const [country, setCountry] = useState(null);// delivery country
    const [from, setFrom] = useState(null);// from country
    const [space, setSpace] = useState("10");
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);


    const dispatch = useDispatch();
    const isCreatingSellerRequest = useSelector(state => state.sellerState.isCreatingSellerRequest);
    const createSellerRequestSuccess = useSelector(state => state.sellerState.createSellerRequestSuccess);
    const createSellerRequestFailure = useSelector(state => state.sellerState.createSellerRequestFailure);



    useEffect(() => {
        if (createSellerRequestSuccess) {
            showToast({ code: 200, result: `Request created successfully` });
            setTimeout(() => {
                navigation.navigate("MainTabScreen")
            },1000)
        }
        if (createSellerRequestFailure) {
            showToast(createSellerRequestFailure);
        }
        dispatch(resetGenerateSellerRequest());
    }, [createSellerRequestSuccess, createSellerRequestFailure])


    const onSelectCountry = (result) => {
        doSetDeliveryCountry ? setCountry(result.name) : setFrom(result.name);
    }

    const handleOnPostRequestPressed = () => {
        if (country !== from) {
            const body = {
                userDto: {
                    id: global.userId
                },
                categoryDto: {
                    category: "TRAVELLER"
                },
                startDate: travellerDate,
                fromCountry: from,
                deliveryCountry: country,
                title: title,
                description: description,
                qty: space
            }

            dispatch(generateSellerRequest(body));
        } else {
            alert("From country and the delivery country cannot be the same");
        }

    }




    return (
        <ScrollView style={styles.container}>
            <Loader isLoading={isCreatingSellerRequest} />

            <CountryPicker
                {...{
                    withFilter: true,
                    withFlag: true,
                    withCountryNameButton: true,
                    withAlphaFilter: true,
                    withCallingCode: true,
                    withEmoji: true,
                    onSelect: onSelectCountry,
                    containerButtonStyle: { display: 'none' }
                }}
                visible={isCountryPickerVisible}
                onClose={() => setCountryPickerVisible(false)}
            />


            <View style={styles.background}>
                <View style={styles.content}>

                    <FontAwesome5.Button
                        name="chevron-left"
                        size={20}
                        backgroundColor="#fff"
                        color="black"
                        onPress={() => navigation.goBack()}

                    />

                </View>
                <View style={styles.baseForm}>
                    <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 20 }}>Create Traveller Request</Text>
                    <View style={styles.textinput}>
                        <InputForm
                            value={title}
                            onChangeText={(val) => setTitle(val)}
                            placeholder={'Title'} />

                        <InputForm
                            value={description}
                            onChangeText={(val) => setDescription(val)}
                            placeholder={'Discription'} />

                        <TouchableOpacity
                            onPress = {() => setIsCalendarVisible(!isCalendarVisible)}
                        >
                            <InputForm
                                value={travellerDate}
                                editable = {false}
                                placeholder={'Travelling Date'}
                            />
                        </TouchableOpacity>

                        {
                            isCalendarVisible ? 
                            <Calendar 
                                onDayPress = {(day) => setTravellerDate(day.dateString)}
                            /> 
                            : null
                        }
                      


                        <InputForm
                            value={space}
                            onChangeText={(val) => setSpace(val)}
                            placeholder={'Free space (KG)'} />

                        <TouchableOpacity onPress={() => {
                            doSetDeliveryCountry = true;
                            setCountryPickerVisible(true);
                        }}>

                            <InputForm
                                editable={false}
                                value={country}
                                placeholder={'Country'} />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            doSetDeliveryCountry = false;
                            setCountryPickerVisible(true)
                        }}>
                            <InputForm
                                editable={false}
                                value={from}
                                placeholder={'From'}
                            />
                        </TouchableOpacity>

                        <View style={styles.menuItem}>
                            <Checkbox
                                color={greenColor}
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text style={styles.menuItemText}>I agree to the</Text>
                            <Text style={styles.menuItemTextGreen}> Terms &  Conditions</Text>

                        </View>

                        <Button
                            disabled={!title || !description || !space || !country || !checked || !travellerDate}
                            title="Post Request"
                            color="#20B2AA"
                            onPress={handleOnPostRequestPressed}
                        />


                    </View>
                </View>
            </View>

        </ScrollView>
    )

}

export default CreateTravellerRequest;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    background: {
        backgroundColor: "white",
        paddingHorizontal: 20
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        width: "100%"
    },
    headerText: {
        fontSize: 28,
        color: "#000000",
        fontWeight: "bold",
        marginTop: 5
    },
    buttonRegist: {
        paddingVertical: 10, alignItems: 'center', borderRadius: 20, backgroundColor: '#20B2AA', marginTop: 50, paddingHorizontal: 10

    },
    textinput: {
        paddingHorizontal: 10,
        paddingTop: 15
    },
    menuItem: {
        paddingTop: 30,
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: -25,



    },
    menuItemText: {
        alignItems: 'flex-start',
        color: '#808080',
        paddingTop: 5,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
    menuItemTextGreen: {
        alignItems: 'flex-start',
        color: greenColor,
        paddingTop: 5,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
})
