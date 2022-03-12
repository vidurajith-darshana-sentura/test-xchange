import React from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {greenColor} from '../../styles/constants';
import {useNavigation} from '@react-navigation/native';

const SellerMode = () => {
    const navigation = useNavigation();

    return (
        <View>
            <ScrollView

                style={styles.container}
                showsVerticalScrollIndicator={false}>
                <View style={styles.menuWrapper}>
                    <Text style={styles.header}>Requests</Text>
                    <TouchableRipple onPress={() => {
                        navigation.navigate('BuyerRequest')
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="file-document-outline" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Buyer Requests</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple>

                    <Text style={styles.header}>Your Request</Text>
                    <TouchableRipple onPress={() => {
                        navigation.navigate('CreateShipment')
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="ship-wheel" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Shipments</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {
                        navigation.navigate('CreateTraveller')
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="wallet-travel" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Traveller</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple>

                    <Text style={styles.header}>Activities</Text>
                    <TouchableRipple onPress={() => {
                         navigation.navigate('CreateSellerOffer')
                        
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="tools" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Past Orders</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => {
                        navigation.navigate("ViewOffers");
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="account" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Your Offers</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple>

                    {/* <TouchableRipple onPress={() => {
                    }} style={styles.ripple}>
                        <View style={styles.menuItem}>
                            <Icon name="telegram" color={greenColor} size={25}/>
                            <Text style={styles.menuItemText}>Invite Friends</Text>
                            <Icon name="chevron-right" color={greenColor} size={25}
                                  style={{position: 'absolute', right: 15, top: 15}}/>

                        </View>
                    </TouchableRipple> */}


                </View>
            </ScrollView>
        </View>
    );
};

export default SellerMode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 60,
        paddingBottom: 470,
        paddingLeft: 0,
        paddingHorizontal: 0,
        paddingVertical: 0
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#BF3325',
        borderBottomWidth: 1,
        borderTopColor: '#BF3325',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,

    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    menuWrapper: {

        backgroundColor: '#F4F4F4'

    },
    menuItem: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginLeft: -20,


    },
    menuItemText: {
        alignItems: 'flex-start',
        color: 'black',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,

    },
    header: {
        marginRight: 10,
        fontWeight: '600',
        fontSize: 22,
        paddingTop: 20,
        marginBottom: 10,
        left: 10
    },
    ripple: {
        backgroundColor: 'white',
        borderWidth: 0.50,
        borderColor: '#DFDFDF'
    }

});
