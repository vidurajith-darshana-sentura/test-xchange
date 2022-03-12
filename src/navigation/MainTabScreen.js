import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../views/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStack from "./AppStack/HomeStack";
import MessageStack from "./AppStack/MessageStack";
import NotificationStack from "./AppStack/NotificationStack";
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)
      ?? ""

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{
        bottom: 20,
        position: 'absolute',
        paddingHorizontal: 22,
        marginHorizontal: 20,
        radius: 20,
        borderBottomWidth: 0,
        backgroundColor: '#20B2AA',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={'#fff'} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={({ route }) => ({
          // tabBarVisible: getTabBarVisibility(route),
          // tabBarLabel: 'message',
          tabBarVisible: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ""

            if (routeName === "Message") {
              return false
            }

            return true
          })(route),
          tabBarIcon: ({ color }) => (
            <Icon name="chatbubble-sharp" color={'#fff'} size={26} />
          ),
        })}/>

      <Tab.Screen
        name="Notifications"
        component={NotificationStack}
        options={{
          tabBarLabel: 'Notifications',

          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={'#fff'} size={26} />
          ),
        }}/>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={'#fff'} size={26} />
          ),
        }}/>
    </Tab.Navigator>
  )
};

export default MainTabScreen;





