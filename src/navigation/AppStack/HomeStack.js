import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../../views/HomeScreen";
import {TouchableOpacity} from 'react-native';
import BuyerPost from "../../views/posts/BuyerPost";
import ShipmentPost from '../../views/posts/ShipmentPost.js'
import TravelPost from '../../views/posts/TravelPost'
import Profile from '../../views/Profiles/Profile';
import ChatNewScreen from '../../views/ChatNewScreen';

const Stack = createStackNavigator();
const HomeStack = ({navigation}) => (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {
            color: '#2e64e5',
            fontFamily: 'Kufam-SemiBoldItalic',
            fontSize: 18,
        },
        headerBackImage: () => (
            <Image
                source={require('../../assets/images/hamburger.png')}
                style={{
                    height: 20,
                    width: 30,
                    left: 20,
                    top: 20
                }}
            />),
        headerStyle: {
            elevation: 0,
        },
        headerRight: () => (
            <View style={{marginRight: 10}}>
                <TouchableOpacity>
                    <Image
                        source={global.profileImage ? {uri: global.profileImage} : require('../../assets/images/user1.png')}
                        style={{height: 50, width: 50, marginTop: 30,  borderRadius: 50}}
                        onPress={() => navigation.navigate('Profile')}
                    />
                </TouchableOpacity>
            </View>
        ),

    }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
            title: ' ',
        }}/>

        <Stack.Screen name="BuyerRequest" component={BuyerPost} options={{
            name: 'BuyerRequest ',
            headerTitle: 'Buyer Requests',
            headerTitleStyle: styles.headerStyle,
            headerBackImage: () => (
                <View style={{marginLeft: 10, marginTop: 25}}>
                    <Ionicons name="chevron-back" size={27} color="black"/>
                </View>
            ),
        }}/>

        <Stack.Screen name="ShipmentRequests" component={ShipmentPost} options={{
            name: 'ShipmentPost ',
            headerTitle: 'Shipments',
            headerTitleStyle: [styles.headerStyle],
            headerBackImage: () => (
                <View style={{marginLeft: 10, marginTop: 25}}>
                    <Ionicons name="chevron-back" size={27} color="black"/>
                </View>
            ),
        }}/>

        <Stack.Screen name="TravelRequests" component={TravelPost} options={{
            name: 'TravelPost ',
            headerTitle: 'Travel Requests',
            headerTitleStyle: styles.headerStyle,
            headerBackImage: () => (
                <View style={{marginLeft: 10, marginTop: 25}}>
                    <Ionicons name="chevron-back" size={27} color="black"/>
                </View>
            ),
        }}/>

        <Stack.Screen name="BuyerProfile" component={Profile} options={{
            name: 'Profile ',
            headerTitle: 'Buyer  Requests',
            headerTitleStyle: styles.headerStyle,
            headerBackImage: () => (
                <View style={{marginLeft: 10, marginTop: 25}}>
                    <Ionicons name="chevron-back" size={27} color="black"/>
                </View>
            )
        }}/>

        <Stack.Screen name="ChatNew" component={ChatNewScreen} options={{
            name: 'Profile ',
            headerTitle: 'Buyer  Requests',
            headerTitleStyle: styles.headerStyle,
            headerBackImage: () => (
                <View style={{marginLeft: 0, paddingTop: 40}}>
                    <Ionicons name="chevron-back" size={27} color="black"/>
                </View>
            ),
        }}/>
    </Stack.Navigator>
);

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: 30,
        fontSize: 27,
        paddingHorizontal: '10%'
    }
})
export default HomeStack;