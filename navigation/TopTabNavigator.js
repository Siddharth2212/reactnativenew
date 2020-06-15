import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import SellerScreen from '../screens/SellerScreen';
import {Icon} from "react-native-elements"
import auth, { firebase } from "@react-native-firebase/auth"

function SettingsScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Welcome {props.user.phoneNumber}!</Text> */}
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
      <Tab.Navigator tabBarOptions={{
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'powderblue' },
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ 
          showIcon: true, 
          tabBarLabel: 'Search', 
          tabBarIcon: ({ tintColor }) => (
            //Your icon component for example => 
            <Icon name="phone" size={30} color="red" />
          ) }
        } />
        <Tab.Screen name="Your Profile" component={SellerScreen} />
        <Tab.Screen name="Calls" component={SettingsScreen} />
      </Tab.Navigator>
  );
}
