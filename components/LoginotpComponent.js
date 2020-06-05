import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet } from 'react-native'
import { Container, Header, Content, Text } from 'native-base'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '@Theme/Style'
import OTPInputView from '@twotalltotems/react-native-otp-input'

class Loginotp extends Component {
  render() {
    var {navigate, replace } = this.props.navigation

    return <Container style={Style.bgMainIntro}>
      <Header style={Style.navigation}>
        <StatusBar backgroundColor='#101E3D' animated barStyle='light-content' />

        <View style={Style.actionBarLeft}>
          <Button
              buttonStyle={{backgroundColor: 'rgba(52, 52, 52, 0)'}}
              titleStyle={Style.loginBtnText}
              iconContainerStyle={Style.textWhite}
              onPress={() => {
                navigate("Login")
              }}
              icon={
                <Icon
                  name="arrow-left"
                  size={15}
                  color="white"
                />
              }
              iconRight
            />
        </View>
        <View style={Style.actionBarMiddle}>
          <Text style={Style.actionBarText}>{'Verification'.toUpperCase()}</Text>
        </View>
        <View style={Style.actionBarRight} />
      </Header>

      <Content style={Style.layoutInner} contentContainerStyle={Styles.layoutContent}>

        <View style={Styles.loginBg}>
          <Text style={Styles.title}>We sent you a code to verify your mobile number</Text>
          <Text style={Styles.subTitle}>Enter your OTP Code here</Text>
          <View>
          <OTPInputView
    style={{height: 200}}
    pinCount={4}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={Style.underlineStyleBase}
    codeInputHighlightStyle={Style.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
            <Button
              buttonStyle={Styles.loginBtn}
              titleStyle={Styles.loginBtnText}
              onPress={() => {
                navigate("Root")
              }}
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="black"
                />
              }
              iconRight
              title={'Submit'.toUpperCase()}
            />
          </View>
          <Text style={Styles.text}>I didn't receive a code!</Text>
          <Text style={Styles.textLink}>Resend Code</Text>
        </View>

      </Content>

    </Container>
  }
}

const Styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  layoutContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  loginBg: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
  },
  subTitle: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  textInputGroup: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#48556E',
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 2,
    justifyContent: 'space-between',
    flexGrow: 1,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#FFF',
  },


  loginBtn: {
    width: '100%',
    backgroundColor: '#F3BA1D',
    borderRadius: 5,
    paddingVertical: 15,
  },
  loginBtnText: {
    color: '#101E3D',
    fontSize: 14,
  },
  loginBtnIcon: {
    color: '#101E3D',
    fontSize: 24,
  },

  text: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  textLink: {
    color: '#F3BA1D',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Loginotp