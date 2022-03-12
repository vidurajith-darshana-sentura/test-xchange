import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    StyleSheet,
    Animated,
    ScrollView
} from 'react-native';
import InputForm from '../../components/TextField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { greenColor } from '../../styles/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal'
import ImagePicker from "../../components/ImagePicker";
import {Calendar} from "react-native-calendars"
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../configurations/toastConfigurations';
import { generateBuyerRequest, resetGenerateBuyerRequest } from '../../redux/actions/buyerAction';
import Loader from "../../components/Loader";


const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);




    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};


const CreateBuyerRequest = ({ navigation }) => {

    const choosePhotoFromLibrary = () => {

    }

    const [visible, setVisible] = React.useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [deliveryCountry, setDeliveryCountry] = useState(null);
    const [price, setPrice] = useState(null);
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [attachmentList, setAttachmentList] = useState([]);
    const [recentlAttachment, setRecentAttachment] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [markedDates, setMarkedDates] = useState({});



    const dispatch = useDispatch();
    const isCreatingBuyerRequest = useSelector(state => state.buyerState.isCreatingBuyerRequest);
    const createBuyerRequestSuccess = useSelector(state => state.buyerState.createBuyerRequestSuccess);
    const createBuyerRequestFailure = useSelector(state => state.buyerState.createBuyerRequestFailure);

    const onSelectCountry = (result) => setDeliveryCountry(result.name);




    useEffect(() => {
        if (createBuyerRequestSuccess) {
            showToast({code: 200, result: `Request created successfully`});
            setTitle(null);
            setDescription(null);
            setDateRange(null);
            setDeliveryCountry(null);
            setPrice(null);
            setAttachmentList([]);
            setRecentAttachment(null);
            setIsCalendarVisible(false);
            setMarkedDates({});
            setTimeout(() => {
                navigation.navigate("MainTabScreen")
            },1000)
        }
        if (createBuyerRequestFailure) {
            showToast(createBuyerRequestFailure);
        }
        dispatch(resetGenerateBuyerRequest());
    }, [createBuyerRequestSuccess,createBuyerRequestFailure])





    const handleOnPostRequestPressed = () => {
        if(title && description && deliveryCountry && price && Object.keys(markedDates).length === 2){

            if(attachmentList.length > 0) {
                const formdata = new FormData();
                formdata.append('userId',global.userId);
                formdata.append('title',title);
                formdata.append("description", description);
                formdata.append("deliveryCountry", deliveryCountry);
                formdata.append("price", price);

                Object.keys(markedDates).forEach((key, index) => {
                    if(index === 0) formdata.append("startDate", key);

                    if(index === 1) formdata.append("endDate", key);
                })



                attachmentList.forEach((item, index) => {
                    formdata.append(`itemName${index+1}`,item.itemName);
                    formdata.append(`sampleImage${index+1}`,item.attachment);
                })
                console.log("FORM: ", formdata)
                dispatch(generateBuyerRequest(formdata));
            } else {
                alert("Please add atleast one attachment to proceed with a buyer request");
            }
        } else {
            alert(`Please note title, description, delivery country, an appropriate date range and a price is mandatory to  post a buyer request`);
        }
    }


    const addAttachment = () => {
        const list = [...attachmentList];
        list.push({itemName, attachment: recentlAttachment});
        setAttachmentList(list);


        setTimeout(() => {
            setVisible(false);
            setRecentAttachment(null);
            setItemName(null);
        },1000)
        console.log("LOST: ", list);
    }

    return (
        <ScrollView style={styles.container}>

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
                visible={isCountryPickerVisible}
                onClose={()=>setCountryPickerVisible(false)}
            />


          <Loader isLoading = {isCreatingBuyerRequest}/>


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
                    <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 20 }}>Create Buyer Request</Text>
                    <View style={styles.textinput}>
                        <InputForm
                            value = {title}
                            placeholder={'Title'}
                            onChangeText = {(val) =>  setTitle(val)}
                        />

                        <InputForm
                            value = {description}
                            placeholder={'Discription'}
                            onChangeText = {(des) => setDescription(des)}
                        />

                        <TouchableOpacity onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
                            <View pointerEvents={"none"}>
                                <InputForm
                                  value = {dateRange}
                                  placeholder={'Date range'}
                                  editable = {false}
                                />
                            </View>
                        </TouchableOpacity>

                        {
                            isCalendarVisible ?
                                <Calendar
                                    markedDates = {markedDates}
                                    onDayPress={(day) =>{
                                        if(Object.keys(markedDates).length < 2 && !Object.keys(markedDates).includes(day)){
                                            let copy = markedDates;
                                            copy = {
                                                ...copy,
                                                [day.dateString]: {selected: true}
                                            }
                                            console.log("cop: ", copy);
                                            let date1 = null;
                                            let date2 = null;

                                            Object.keys(copy).forEach((key, index) => {
                                                index === 0 ? date1 = key : date2 = key;
                                            })

                                            if(new Date(date1) > new Date(date2) && date1 && date2){
                                                let temp = date1;
                                                date1 = date2;
                                                date2 = temp;
                                            }
                                            setDateRange((date1 ? date1 : "" )+ " - " + (date2 ? date2 : ""))
                                            setMarkedDates(copy);
                                        } else {
                                            setDateRange(null);
                                            setMarkedDates({});
                                        }
                                    }}
                                />
                                : null
                        }



                        {/* <Calendar
                            markingType={'period'}
                            onDayPress = {()}
                        /> */}

                        <TouchableOpacity onPress={()=>setCountryPickerVisible(true)}>
                            <View pointerEvents={"none"}>
                                <InputForm
                                  editable = {false}
                                  value = {deliveryCountry}
                                  placeholder={'Delivery country'}
                                />
                            </View>
                        </TouchableOpacity>

                        <InputForm
                            value = {price}
                            placeholder={'Price'}
                            onChangeText = {(price) => setPrice(price)}
                        />
                        <Text style={styles.menuItemText}></Text>

                        <TouchableRipple onPress={() => setVisible(true)} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Add items</Text>
                                <Icon name="plus-circle" color={greenColor} size={25} style={{ position: 'absolute', right: 15, top: 15 }} />


                            </View>
                        </TouchableRipple>
                        <TouchableOpacity onPress={handleOnPostRequestPressed}>

                            <View style={styles.buttonRegist}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19 }}>Post Request</Text>
                            </View>
                        </TouchableOpacity>





                        {/* popup */}
                        <ModalPoup visible={visible}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.header}>
                                    {/* <FontAwesome5.Button
                        name="window-close"
                        size={20}
                        backgroundColor="#fff"
                        color="black"
                         onPress={() => setVisible(false)}

                    /> */}
                                    <Ionicons name="close" size={27} color="black" onPress={() => setVisible(false)} style={{ marginTop: -10 }} />


                                </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, marginTop: -40 }}>Add Item</Text>
                            </View>
                            <InputForm
                                value = {itemName}
                                placeholder={'Item name'}
                                onChangeText = {(val) => setItemName(val)}
                            />


                            <ImagePicker
                                style = {{borderRadius: 10, alignSelf: "center"}}
                                onCaptureImage={data=>{
                                    if (data) {
                                        setRecentAttachment({
                                            name: data.fileName,
                                            type: data.type,
                                            uri: data.uri
                                        })
                                    } else {
                                        setRecentAttachment(null);
                                    }
                                }}
                            />

                            <Text></Text>
                            {/* <TouchableRipple onPress={choosePhotoFromLibrary} style={styles.ripple}>
                                <View style={styles.menuItemPopup}> */}
                                    {/* <Icon name="plus-circle" color={greenColor} size={25} style={{ position: 'absolute', right: 15, top: 15 }} /> */}
                                    {/* <Text  style={{marginTop:60}}>Upload a photo</Text> */}
                                    {/* <Image source={require('../assets/images/6.png')} /> */}

                                    {/* <Icon name="cloud-upload" color={greenColor} size={55} />
                                    <Text style={{ color: greenColor, fontSize: 16 }}>Upload a photo</Text> */}


                                {/* </View>
                            </TouchableRipple> */}

                            {/* <Text></Text>
                            <Text></Text> */}
                            <Button
                                disabled = {!itemName || !recentlAttachment}
                                title="Add"
                                color="#20B2AA"

                                onPress={addAttachment}
                            />

                        </ModalPoup>















                    </View>






                </View>




            </View>

        </ScrollView>
    )

}

export default CreateBuyerRequest;


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
        paddingHorizontal: 15,
        paddingTop: 10
    },
    menuItem: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft: -20,


    },
    menuItemPopup: {
        alignItems: 'center',
        // flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft: 0,


    },
    menuItemText: {
        alignItems: 'center',
        color: greenColor,

        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,

    },
    menuItemTextpopup: {
        alignItems: 'center',
        color: greenColor,
        paddingTop: 30,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,

    },
    ripple: {
        backgroundColor: "#F8F8FF",
        borderWidth: 1,
        borderColor: greenColor,
        borderRadius: 10,

    },
    ripplePopup: {
        backgroundColor: "#F8F8FF",
        borderWidth: 1,
        borderColor: greenColor,
        borderRadius: 10,
    },




    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})
