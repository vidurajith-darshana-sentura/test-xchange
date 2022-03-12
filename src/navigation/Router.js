import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../views/WelcomeScreen';
import SignInScreen from '../views/SignInScreen';
import SignUpScreen from '../views/SignUpScreen';
import HomeScreen from '../views/HomeScreen';
import VerifyEmailScreen from '../views/VerifyEmailScreen';
import UserDetailsScreen from '../views/UserDetailsScreen';
import ColorScreen from '../views/ColorScreen';
import MessageScreen from '../views/MessageScreen';
import MainContainer from './MainTabScreen';
import ProfileScreen from '../views/ProfileScreen';
import ChatScreen from '../views/ChatScreen';
import CreateBuyerRequest from '../views/requests/CreateBuyerRequest';
import CreateTravellerRequest from '../views/requests/CreateTravellerRequest';
import CreateShipmentRequest from '../views/requests/CreateShipmentRequest';
import BuyerPost from '../views/posts/BuyerPost';
import ShipmentPost from '../views/posts/ShipmentPost.js'
import TravelPost from '../views/posts/TravelPost'
import Profile from '../views/Profiles/Profile';
import CreateBuyerOffer from '../views/offers/CreateBuyerOffer';
import ChatNewScreen from '../views/ChatNewScreen';
import CreateSellerOffer from '../views/offers/CreateSellerOffer';
import HomeStack from "./AppStack/HomeStack";
import MessageStack from "./AppStack/MessageStack";
import NotificationScreen from "../views/NotificationScreen";
import ViewOffersScreen from "../views/offers/ViewOffersScreen";
import OfferDetailScreen from "../views/offers/OfferDetailScreen";
import OrderScreen from '../views/orders/OrdersScreen';
import SubNotification from '../views/NotificationSubScreen';

const Stack = createStackNavigator();
const hide = {headerShown: false};

const Router = () => {

    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={hide}/>
            <Stack.Screen name="SignIn" component={SignInScreen} options={hide}/>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={hide}/>
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} options={hide}/>
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={hide}/>
            <Stack.Screen name="ColorScreen" component={ColorScreen} options={hide}/>
            <Stack.Screen name="MainTabScreen" component={MainContainer} options={hide}/>
            <Stack.Screen name="MessageScreen" component={MessageScreen} options={hide}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={hide}/>
            <Stack.Screen name="Chat" component={ChatScreen} options={hide}/>
            <Stack.Screen name="CreateBuyer" component={CreateBuyerRequest} options={hide}/>
            <Stack.Screen name="CreateTraveller" component={CreateTravellerRequest} options={hide}/>
            <Stack.Screen name="CreateShipment" component={CreateShipmentRequest} options={hide}/>
            <Stack.Screen name="BuyerRequest" component={BuyerPost} options={hide}/>
            <Stack.Screen name="ShipmentRequests" component={ShipmentPost} options={hide}/>
            <Stack.Screen name="TravelRequests" component={TravelPost} options={hide}/>
            <Stack.Screen name="BuyerProfile" component={Profile} options={hide}/>
            <Stack.Screen name="CreateBuyerOffer" component={CreateBuyerOffer} options={hide}/>
            <Stack.Screen name="ChatNewScreen" component={ChatNewScreen} options={hide}/>
            <Stack.Screen name="CreateSellerOffer" component={CreateSellerOffer} options={hide}/>
            <Stack.Screen name="HomeStack" component={HomeStack} options={hide}/>
            <Stack.Screen name="MessageStack" component={MessageStack} options={hide}/>
            <Stack.Screen name="NotificationStack" component={NotificationScreen} options={hide}/>
            <Stack.Screen name="Home" component={HomeScreen} options={hide}/>
            <Stack.Screen name="ViewOffers" component={ViewOffersScreen} options={hide}/>
            <Stack.Screen name="OfferDetail" component={OfferDetailScreen} options={hide}/>
            <Stack.Screen name="Orders" component={OrderScreen} options={hide}/>
            <Stack.Screen name="SubNotification" component={SubNotification} options={hide}/>

        </Stack.Navigator>
    );
}
export default Router;
