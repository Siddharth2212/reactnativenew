import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Loginotp from './LoginotpComponent';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { addProfile } from '../redux/ActionCreators';
import TopTabNavigator from '../navigation/TopTabNavigator';
import auth, { firebase } from "@react-native-firebase/auth"

const mapStateToProps = state => {
  return {
    profiles: state.profiles
  }
}

const mapDispatchToProps = dispatch => ({
  addProfile: (phone, user) => dispatch(addProfile(phone, user)),
})

const Stack = createStackNavigator();


function MainScreen(props) {

  useEffect(() => {  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in');
        console.log(user);
        // props.addProfile(user.phoneNumber, "Rishabh Sogani");
      }
    });

    const update = {
      displayName: 'Rishabh Jain Sogani',
      photoURL: 'https://my-cdn.com/assets/user/123.png',
    };

    console.log(update)
    
    auth().currentUser.updateProfile(update);
  }, []);

  return(
    <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="Root" component={TopTabNavigator} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
