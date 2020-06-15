import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, StyleSheet, StatusBar, ImageBackground, TouchableHighlight, Text } from 'react-native'
import { Container, Header, Content, View, } from 'native-base'
import Style from '@Theme/Style'

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
      },
      image: {
        width: 320,
        height: 320,
        marginVertical: 32,
      },
      text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
      },
      title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
      },
  });
const slides = [
    {
      key: 'heart',
      title: 'Cutu',
      text: 'Buy time sell time',
      image: require('./images/1.png'),
      imageStyle: styles.image,
    },
    {
      key: 'curricular',
      title: 'Talk to people',
      text: 'Talk to people',
      image: require('./images/2.png'),
      imageStyle: styles.image,
    },
    {
      key: 'activities',
      title: 'Sell your time',
      text: 'Sell your time',
      image: require('./images/3.png'),
      imageStyle: styles.image,
    },
    {
      key: 'tracking',
      title: 'Earn money',
      text: 'Earn money',
      image: require('./images/4.png'),
      imageStyle: styles.image,
    }
  ];

  
 
export default class App extends React.Component {
    constructor(props){  
        super(props);  
        this.state = {  
            showRealApp: false
                  }  
      }  
      _renderItem = ({item}) => {
        return (
          <View
            style={[
              styles.slide,
              {
                backgroundColor: item.bg,
              },
            ]}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      };
  render() {
    var {navigate } = this.props.navigation
    if (this.state.showRealApp) {
      return <App />;
    } else {
        return <Container style={Style.bgMainIntro}>
        <StatusBar backgroundColor="#101E3D" animated barStyle="light-content" />
        <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={function(){
navigate("Login");
        }}/>
      </Container>    }
  }
}