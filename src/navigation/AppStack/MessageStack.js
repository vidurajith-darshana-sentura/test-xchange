import React from 'react';
import {Image, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from "../../views/MessageScreen";
const Stack = createStackNavigator();
const MessageStack = ({ navigation }) => (
    <Stack.Navigator screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: {
            color: '#2e64e5',
            fontFamily: 'Kufam-SemiBoldItalic',
            fontSize: 18,
        },
        headerBackImage: () => <Image source={require('../../assets/images/hamburger.png')} />,
        headerStyle: {
            elevation: 0,
        },
        headerRight: () => (
            <View style={{ marginRight: 10 }}>
                <Image
                    source={require('../../assets/images/user1.png')}
                    style={{ height: 60, width: 60, marginTop: 10, top: 20 }}/>
            </View>
        ),
    }}>

        <Stack.Screen name="Home" component={MessageScreen} options={{
            title: ' ',
            headerLeft: () => (
                <Image
                    source={require('../../assets/images/hamburger.png')}
                    style={{
                        height: 20,
                        width: 30,
                        left: 20,
                        top: 20
                    }}
                />)
        }} />
    </Stack.Navigator>
);

export default MessageStack;


