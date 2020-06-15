import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen';
import SellerScreen from '../screens/SellerScreen';
import LinksScreen from '../screens/LinksScreen';
import { View, Text, BackHandler, Alert } from "react-native"
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
import { createStackNavigator } from '@react-navigation/stack';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTitle: "Search for People"
      }} name="Home" component={HomeScreen} />
      <HomeStack.Screen options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTitle: "Proceed to Payment"
      }} name="Details" component={DetailsScreen} />
      <HomeStack.Screen options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTitle: "View Profile"
      }} name="Profile" component={LinksScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTitle: "Time is Money | Sell Yours & Earn"
      }} name="Settings" component={SellerScreen} />
      <SettingsStack.Screen options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f4511e' },
        headerTitle: "Details"
      }} name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  if (routeName == "Home") {
    navigation.setOptions({
      headerMode: 'none',
      headerShown: false,
    }
    );
    BackHandler.addEventListener('hardwareBackPress', function() {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false });
        return true;
    })
  }
  else {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Search for People',
          tabBarIcon: ({ focused }) => <Icon
          name='search' />,
        }}
      />
      <BottomTab.Screen name="Settings" component={SettingsStackScreen}
        options={{
          title: 'Sell your time',
          tabBarIcon: ({ focused }) => <Icon
          name='payment' />,
        }} />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Search for People';
    case 'Links':
      return 'Time is Money so Sell Yours';
  }
}
