import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, 
        PermissionsAndroid, Dimensions, Modal, Button} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { RadioButton, Checkbox } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import { showToast } from '../../configurations/toastConfigurations';
import { greenColor } from '../../styles/constants';
import MapView , {Marker} from 'react-native-maps';

const checkboxOptions = [
    {label: "DHL", value: "dhl"},
    {label: "UPS", value: "ups"},
    {label: "UPSP", value: "upsp"}
]

const OrdersScreen = () => {
    const [checked, setChecked] = React.useState('shipment');
    const [shipmentType, setShipmentType] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [address, setAddress] = useState({lat: 0, lng: 0});
    const [selectedCoordinate, setSelectedCoordinate] = useState({lat: 0, lng: 0});
    const [isMapModalVisible, setMapModelVisible] = useState(false);


    const getLocation = async () => {
        const granted = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
        if(granted === "granted"){
            Geolocation.getCurrentPosition(
                (position) =>{
                    const currentLon = position.coords.longitude;
                    const currentLat = position.coords.latitude;
    
                    let address = {
                        lat: currentLat,
                        lng: currentLon
                    }
                    setAddress(address);
                    setSelectedCoordinate(address)
                    openMapModel();
                },
                (err) => {
                    showToast({ code: 400, result: err.message});
                    openMapModel();
                },
                {enableHighAccuracy: true, timeout: 25000, maximumAge: 1000}
            )
        } else {
            openMapModel();
        }
    }


    const openMapModel = () => {
        setMapModelVisible(true)
    }

    return (
        <ScrollView style={styles.background}>
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
                <Text style={{ fontSize: 25, paddingHorizontal: 10, paddingTop: 10, marginBottom: 20 }}>
                    Past Orders
                </Text>
            </View>

            <Text>
                Merchant type
            </Text>
            <View style = {{flexDirection:"row", alignItems:"center", marginBottom: 20}}>
                <RadioButton
                    value="shipment"
                    status={ checked === 'shipment' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('shipment')}
                />
                <Text style = {{marginLeft: 10, marginRight: 30}}>
                    Shipment
                </Text>

                <RadioButton
                    value="traveller"
                    status={ checked === 'traveller' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('traveller')}
                />
                <Text style = {{marginLeft: 10}}>
                    Traveller
                </Text>
            </View>


            {
                checked === "shipment" ?

                <View>
                    <Text>Shipment Types</Text>
                    <View>
                        {
                            checkboxOptions.map((item, index) =>
                                <View
                                    key = {index}
                                    style = {{flexDirection:"row",alignItems:"center"}}>
                                    <Checkbox
                                        status={shipmentType === item.value ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setShipmentType(item.value);
                                        }}
                                        />
                                    <Text style = {{marginLeft: 10}}>
                                        {item.label}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </View>

                :

                null
            }
            


            <TextInput
                onChangeText={(val) => {
                    setPostalCode(val);
                }}
                value={postalCode}
                style={{
                    borderColor: '#d3d3d3', borderBottomWidth: 1,
                    padding: 5, paddingTop: 20, fontSize: 15, width: "100%"
                }}
                placeholder={'Postal code'} />



            <TextInput
                onChangeText={(val) => {
                    setMobileNumber(val);
                }}
                value={mobileNumber}
                style={{
                    borderColor: '#d3d3d3', borderBottomWidth: 1,
                    padding: 5, paddingTop: 20, fontSize: 15, width: "100%"
                }}
                placeholder={'Mobile Number'} />

            <TouchableOpacity 
                onPress = {getLocation}
                style = {{paddingVertical: 20}}>
                <TextInput
                    editable = {false}
                    onChangeText={(val) => {
                        setMobileNumber(val);
                    }}
                    value={`latitude: ${selectedCoordinate.lat.toFixed(3)}, longitude: ${selectedCoordinate.lng.toFixed(3)}`}
                    style={{
                        borderColor: '#d3d3d3', borderBottomWidth: 1,
                        padding: 5, fontSize: 15, width: "100%"
                    }}
                    placeholder={'Set Address'} />

            </TouchableOpacity>




            <Modal 
                transparent
                style = {{height: Dimensions.get("screen").height, width:Dimensions.get("screen").width, 
                        backgroundColor: `rgba(0,0,0,0.5)`, justifyContent:"center", alignItems:"center"}}
                visible = {isMapModalVisible} >
                
                <View style = {{backgroundColor:"white", height: "70%", width: "90%", 
                                marginVertical:"30%", alignSelf:"center",borderRadius: 10, 
                                elevation: 10, justifyContent:"space-between", overflow:"hidden"}}>
                    
                    <MapView
                        style = {{height: "85%", width:"100%"}}
                        initialRegion={{
                            latitude: address.lat ? address.lat : 37.78825,
                            longitude: address.lng ? address.lng :  -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress = {(event) => {
                            console.log("knkjfnf: ",event.nativeEvent.coordinate)
                            setSelectedCoordinate({
                                    ...selectedCoordinate,
                                    lat: event.nativeEvent.coordinate.latitude,
                                    lng: event.nativeEvent.coordinate.longitude
                            })
                        }}
                    >
                        <Marker 
                            coordinate = {{latitude: selectedCoordinate.lat, 
                                          longitude: selectedCoordinate.lng,
                                          latitudeDelta: 0.0922,
                                          longitudeDelta: 0.0421}}
                        />
                    </MapView>
                    
                    <View style = {{marginHorizontal: 20, marginBottom: 20}}>
                        <Button 
                            color = {greenColor}
                            onPress = {() => setMapModelVisible(false)}
                            title = "DONE"
                        />
                    </View>
                  

                </View>

            </Modal>
        </ScrollView>
    )
}


export default OrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    background: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        flex: 1
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        width: "100%"
    },
    buttonRegist: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#20B2AA',
        marginTop: 50,
        paddingHorizontal: 10
    },
    textinput: {
        paddingHorizontal: 15,
        paddingTop: 10
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
})