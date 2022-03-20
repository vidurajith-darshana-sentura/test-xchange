import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TextInput,
    ScrollView,
    Button
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Title, Text } from 'react-native-paper';
import { greenColor } from '../../styles/constants';
import { useDispatch, useSelector } from 'react-redux';
import { queryCommissionRates } from '../../redux/actions/commonActions';
import CountryPicker from 'react-native-country-picker-modal'
import {createOfferRequest, resetCreateOfferRequest, resetGetOfferListRequest} from '../../redux/actions/offerAction';
import Loader from "../../components/Loader";
import { showToast } from '../../configurations/toastConfigurations';
import { useNavigation } from '@react-navigation/native';


const itemProperty = {
    itemName: "",
    price: "",
    qty: ""
}

let doSetDeliveryCountry = false;
let toId = null;

const CreateOffer = (props) => {
    const [checked, setChecked] = React.useState(false);
    const [itemList, setItemList] = useState([{...itemProperty}]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [description, setDescription] = useState(null);
    const [userPrice, setUserPrice] = useState("");
    const [deliveryCountry, setDeliveryCountry] = useState(null);// delivery country
    const [fromCountry, setFromCountry] = useState(null);// from country
    const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const commissionRate = useSelector(state => state.commonState.commissionRate);
    const isCreatingOffer= useSelector(state => state.offerState.isCreatingOffer);
    const createOfferSuccess = useSelector(state => state.offerState.createOfferSuccess);
    const createOfferFailed = useSelector(state => state.offerState.createOfferFailed);


    useEffect(() => {
        if (commissionRate === 0) {
            dispatch(queryCommissionRates())
        }

        if(props && props.route.params && Object.keys(props.route.params).includes("isSeller")){
            setIsSeller(props.route.params.isSeller);
        }

        if(props && props.route.params && Object.keys(props.route.params).includes("toId")){
            toId = props.route.params.toId
        }
    }, [])


    useEffect(() => {
        if (createOfferSuccess) {

            if (createOfferSuccess.code === 203) {
                navigation.navigate('ExternalWebView',{webUrl: createOfferSuccess.result});
                showToast({ code: 203, result: `Please complete the stripe authentication` });
            } else {

            }
        }
        if (createOfferFailed) {
            showToast(createOfferFailed);
        }
        dispatch(resetCreateOfferRequest());
    }, [createOfferSuccess, createOfferFailed])

    const onSelectCountry = (result) => {
        doSetDeliveryCountry ? setDeliveryCountry(result.name) : setFromCountry(result.name);
    }

    const generateOfferRequest = () => {
        console.log("BODY: ");
        if(itemList.length > 0 && description){
            let body = {
                fromUser: {
                    id: global.userId
                },
                toUser: {
                    id: toId
                },
                description: description,
                buyerUser:  (!isSeller ? global.userId : toId),
                sellerUser: (isSeller ? global.userId : toId),
                fromCountry: fromCountry,
                deliveryCountry: deliveryCountry,
                userCharge: userPrice,
                subTotal: parseInt(totalPrice),
                totalPrice: (parseInt(totalPrice) + parseInt(userPrice)),
                itemList
            }

            console.log("BODY: ", body);
            dispatch(createOfferRequest(body))
        }

    }

    return (
        <View style={{flex: 1}}>

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
                            paddingHorizontal={-30}
                        />
                        <Text style={{ fontSize: 25, paddingHorizontal: 20, }}>Create {isSeller ? 'Seller' : 'Buyer'} Offer</Text>
                    </View>
                    <View style={styles.menuWrapper}>
                        <Text style={styles.subheader}>Offer Description</Text>
                        <TextInput
                            value = {description}
                            onChangeText = {(val) => setDescription(val)}
                            style={{ borderColor: '#d3d3d3', borderBottomWidth: 1, padding: 5, fontSize: 15 }}
                            placeholder={'Describe your offer'} />

                        <Text style={styles.subheader}>
                            Item Details
                        </Text>
                        {
                            itemList.map((item, index) =>
                                <View key={index}
                                      style={{
                                          padding: 10, borderRadius: 10, borderWidth: 1,
                                          borderColor: "#20B2AA", marginBottom: 20
                                      }}>
                                    <TextInput
                                        onChangeText={(val) => {
                                            const arr = [...itemList];
                                            arr[index].itemName = val;
                                            setItemList(arr);
                                        }}
                                        value={item.itemName}
                                        style={{
                                            borderColor: '#d3d3d3', borderBottomWidth: 1,
                                            padding: 5, paddingTop: 20, fontSize: 15
                                        }}
                                        placeholder={'Item name'} />

                                    <TextInput
                                        onChangeText={(val) => {
                                            let arr = [...itemList];
                                            arr[index].price = (!isNaN(val) ? val : "");
                                            setItemList(arr);

                                            let price = 0;
                                            val && !isNaN(val) && item.qty && !isNaN(item.qty) && arr.forEach(item => {
                                                price += parseInt(item.price) * parseInt(item.qty);
                                            })
                                            setTotalPrice(!isNaN(price) ? price : 0)
                                        }}
                                        keyboardType="numeric"
                                        value={item.price}
                                        style={{
                                            borderColor: '#d3d3d3', borderBottomWidth: 1,
                                            padding: 5, paddingTop: 20, fontSize: 15
                                        }}
                                        placeholder={'Price (USD)'} />

                                    <TextInput
                                        onChangeText={(val) => {
                                            const arr = [...itemList];
                                            arr[index].qty = !isNaN(val) ? val : "";
                                            setItemList(arr);

                                            let price = 0;
                                            val && !isNaN(val) && item.price && !isNaN(item.price) && arr.forEach(item => {
                                                price += parseInt(item.price) * parseInt(item.qty);
                                            })
                                            setTotalPrice(!isNaN(price) ? price : 0)
                                        }}
                                        keyboardType="numeric"
                                        value={item.qty}
                                        style={{
                                            borderColor: '#d3d3d3', borderBottomWidth: 1,
                                            padding: 5, paddingTop: 20, fontSize: 15
                                        }}
                                        placeholder={'Quantity'} />

                                    <Text style = {{textAlign:"right", marginTop: 10}}>
                                        Sub Total : ${item.qty && item.price ? parseInt(item.qty) * parseInt(item.price) : 0}
                                    </Text>
                                </View>
                            )
                        }
                        <Button
                            disabled={itemList.length === 5}
                            title="Add"
                            color="#20B2AA"
                            onPress={() => {
                                if (itemList.length < 5) {
                                    const list = [...itemList];
                                    list.push({ ...itemProperty });
                                    setItemList(list);
                                }
                            }}
                        />


                        <Text style = {{marginTop: 20}}>
                            User Charge (USD)
                        </Text>
                        <TextInput
                            style={{
                                borderColor: '#d3d3d3', borderBottomWidth: 1,
                                padding: 5,  fontSize: 15
                            }}
                            keyboardType={'numeric'}
                            placeholder = {"User Charge"}
                            value = {userPrice}
                            onChangeText = {(val) => setUserPrice(val)}
                        />


                        <Text style = {{marginTop: 20}}>
                            From Country
                        </Text>
                        <TouchableOpacity
                            style = {{paddingVertical: 10}}
                            onPress = {() =>{doSetDeliveryCountry = false; setCountryPickerVisible(true)}}>
                            <View pointerEvents={"none"}>
                                <TextInput
                                    editable={false}
                                    style={{
                                        borderColor: '#d3d3d3', borderBottomWidth: 1,
                                        padding: 5,  fontSize: 15
                                    }}
                                    placeholder = {"From Country"}
                                    value = {fromCountry}
                                />
                            </View>
                        </TouchableOpacity>


                        <Text style = {{marginTop: 20}}>
                            Delivery Country
                        </Text>
                        <TouchableOpacity
                            style = {{paddingVertical: 10}}
                            onPress = {() =>{doSetDeliveryCountry = true;setCountryPickerVisible(true)}}>
                            <View pointerEvents={"none"}>
                                <TextInput
                                    editable={false}
                                    style={{
                                        borderColor: '#d3d3d3', borderBottomWidth: 1, fontSize: 15
                                    }}
                                    placeholder = {"Delivery Country"}
                                    value = {deliveryCountry}
                                />
                            </View>
                        </TouchableOpacity>


                        <View style={{ paddingTop: 0 , marginTop: 15, marginBottom: 20}}>
                            <Text style={styles.priceItemText}>Total Price</Text>
                            <Text style={{ position: 'absolute', right: 15, top: 0, fontSize: 15 }}>$ {totalPrice}</Text>


                        </View>

                        {
                            commissionRate ?

                                <Text style={{ textAlign: 'center', color: '#AAAAAA', fontSize: 13}}>
                                    Exchange app will be charge {commissionRate}%
                                </Text>

                                :
                                null
                        }


                        <TouchableOpacity
                            disabled = {!description || !fromCountry || !deliveryCountry}
                            style={{ marginBottom: 20 }}
                            onPress={generateOfferRequest}>
                            <View style={[styles.buttonRegist,{backgroundColor: (!description || !fromCountry || !deliveryCountry) ? "grey" : "#20B2AA"}]}>
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 19 }}>Create Offer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <Loader isLoading = {isCreatingOffer}/>
        </View>
    )
}

export default CreateOffer;


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
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#20B2AA',
        marginTop: 5,
        paddingHorizontal: 10

    },
    textinput: {
        paddingHorizontal: 10,
        paddingTop: 15
    },
    header: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
        // left: 10
    },
    discription: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 14.5,
        marginBottom: 10,
    },
    subheader: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 20,
        paddingTop: 20,
        marginBottom: 10,
    },
    menuItem: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: -20,


    },
    menuItemText: {
        alignItems: 'flex-start',
        color: 'black',

        fontWeight: '600',
        fontSize: 20,
        lineHeight: 26,

    },
    title: {
        fontSize: 16.5,
        marginRight: 60
        // fontWeight: 'bold',
    },
    userImg: {
        height: 80,
        width: 90,
        borderRadius: 10,
    },
    userInfoSection: {

        paddingHorizontal: 0,
        marginBottom: 0,
        marginHorizontal: 0,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        borderRadius: 10,
    },
    priceItemText: {
        alignItems: 'flex-start',
        color: 'black',

        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
    menuWrapper: {
        paddingTop: 10
    }


})
