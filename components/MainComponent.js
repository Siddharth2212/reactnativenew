import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Login from './LoginComponent';
import Loginotp from './LoginotpComponent';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App(props) {
  return(
    <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Loginotp" component={Loginotp} />
        <Stack.Screen options={{headerShown: false}} name="Root" component={HomeScreen} />
    </Stack.Navigator>
        </NavigationContainer>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
