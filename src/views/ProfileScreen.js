import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React  from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { userLogout } from '../services/httpConfig';
import {greenColor} from '../styles/constants';
import {resetAuthState} from '../redux/actions/authActions'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>

                <View style={{flexDirection: 'row', marginTop: 55}}>
                    <Avatar.Image
                        source={{
                            uri: 'http://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png',
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                            color: 'white'
                        }]}>Alexis Norris</Title>
                        <Caption style={styles.caption}>@alex_noe</Caption>

                    </View>

                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" color="white" size={20}/>
                        <Text style={{color: "white", marginLeft: 20}}>Ontario, Canada</Text>
                    </View>

                    <View style={styles.row}>
                        <Icon name="email" color="white" size={20}/>
                        <Text style={{color: "white", marginLeft: 20}}>alex.norris@yahoo.com</Text>
                    </View>
                </View>
            </View>


            <View style={{
                backgroundColor: "#FFF",
                flex: 1
            }}>
                <View style={{
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                    marginTop: -25
                }}>


                    {/* Profile section */}

                    <View style={styles.menuWrapper}>
                        <Text style={styles.header}>My Xchange</Text>

                        <TouchableRipple onPress={() => {
                        }} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Icon name="diamond-stone" color={greenColor} size={25}/>
                                <Text style={styles.menuItemText}>Get inspired</Text>
                                <Icon name="chevron-right" color={greenColor} size={25}
                                      style={{position: 'absolute', right: 15, top: 15}}/>


                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => {
                        }} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Icon name="heart-outline" color={greenColor} size={25}/>
                                <Text style={styles.menuItemText}>My favorites</Text>
                                <Icon name="chevron-right" color={greenColor} size={25}
                                      style={{position: 'absolute', right: 15, top: 15}}/>


                            </View>
                        </TouchableRipple>

                        <TouchableRipple onPress={() => {
                        }} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Icon name="file-document-outline" color={greenColor} size={25}/>
                                <Text style={styles.menuItemText}>Payments</Text>
                                <Icon name="chevron-right" color={greenColor} size={25}
                                      style={{position: 'absolute', right: 15, top: 15}}/>

                            </View>
                        </TouchableRipple>
                        <Text style={styles.header}>General</Text>


                        <TouchableRipple onPress={() => {
                            myCustomShare
                        }} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Icon name="telegram" color={greenColor} size={25}/>
                                <Text style={styles.menuItemText}>Invite Friends</Text>

                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => {
                            dispatch(resetProfileState());
                            userLogout()
                        }} style={styles.ripple}>
                            <View style={styles.menuItem}>
                                <Icon name="logout" color={greenColor} size={25}/>
                                <Text style={styles.menuItemText}>Log Out</Text>
                                <Icon name="chevron-right" color={greenColor} size={25}
                                      style={{position: 'absolute', right: 15, top: 15}}/>

                            </View>
                        </TouchableRipple>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );

};

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    userInfoSection: {

        backgroundColor: '#20B2AA',
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
        color: 'white'
    },
    row: {
        flexDirection: 'row',

        marginLeft: -30,
        marginTop: 20
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
        paddingHorizontal: 30,
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
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
