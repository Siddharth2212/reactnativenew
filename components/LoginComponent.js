import React from 'react'
import { StatusBar, TextInput, Image, View, StyleSheet } from 'react-native'
import { Container, Content, Icon, Text } from 'native-base'
import {Button} from "react-native-elements"

// import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'

export default class extends React.Component {
  static navigationOptions = {
    headerMode: "none"
};
  render () {
    var {navigate } = this.props.navigation
    return <Container style={Style.bgMainIntro}>
      <StatusBar backgroundColor='#101E3D' animated barStyle='light-content' />

      <Content style={Style.layoutInner} contentContainerStyle={Styles.layoutContent}>

        <View style={Styles.loginBg}>
          <Image source={require('../assets/images/icon.png')} style={Styles.logoImg} />
          <Text style={Styles.logoText}>{'APP NAME'.toUpperCase()}</Text>
          <View>
            <Text style={Styles.textLabel}>{'Name'.toUpperCase()}</Text>
            <TextInput style={Styles.textInput} />
            <Text style={Styles.textLabel}>{'Mobile No.'.toUpperCase()}</Text>
            <TextInput style={Styles.textInput} />
            <Button
            style={Styles.loginBtn}
            title={'Login'.toUpperCase()}
            onPress={() => {
              navigate("Loginotp")
            }}
            />
          </View>
        </View>

      </Content>

    </Container>
  }
}

const Styles = StyleSheet.create({
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
        logoImg: {
            marginBottom: 20,
            alignSelf: 'center',
        },
        logoText: {
            color: '#F3BA1D',
            alignSelf: 'center',
            marginBottom: 30,
            fontSize: 20,
            lineHeight: 28,
            textAlign: 'center',
        },
        textLabel: {
            color: '#FFF',
            fontSize: 13,
            marginBottom: 10,
        },
        textInput: {
            backgroundColor: '#48556E',
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            color: '#fff',
        },
    
        loginBtn: {
            width: '100%',
            backgroundColor: '#F3BA1D',
            borderRadius: 5,
            paddingVertical: 20,
        },
        loginBtnIcon: {
            color: '#101E3D',
            fontSize: 24,
        }
});
