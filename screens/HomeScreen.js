import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, FlatList, Image } from 'react-native';
import {  ListItem, Text, Button, SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import {Loading} from "../components/LoadingComponent"

// const mapStateToProps = state => {
//     return {
//     }
//   }
var avatar_url = 'https://pbs.twimg.com/profile_images/573391750829506560/Vgk8ZOfR.jpeg';


function HomeScreen( props) {
  useEffect(() => {
    console.log("ahiegaheggeaoheg");
  }, []);

  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [guests, setGuests] = useState(1);
  const [showModal, setShowModal] = useState(false);
  function updateSearch(search) {
    setSearch(search);
    if (search !== "") {
      setLoader(true);
    }
    else {
      setLoader(false)
    }
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  function toggleModal2() {
    setShowModal(!showModal);
    navigation.navigate('Details')
  }

  if(false){
    return  <Loading text="Loading" />
  }
  else{
    return (
      <View style={styles.container}>
        {/* <View style={styles.welcomeContainer}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/qutulogo.jpeg')
              : require('../assets/images/qutulogo.jpeg')
          }
          style={styles.welcomeImage}
        />
      </View>

      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>Welcome Siddharth:</Text>
        <Text style={styles.getStartedText}>
          Search who you want to talk to
            {search !== "" && "Your search:" + search}
        </Text>
      </View> */}

      <SearchBar
        showLoading={loader}
        showCancel
        lightTheme
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={[]}
          renderItem={({ item }) => (
            <ListItem
              topDivider
              bottomDivider
              title={item.name}  
              subtitle={
                <View style={{ flex: 1, flexDirection: "row"}}>
                  <View style={{flex:12}}>
              <Text>{item.description}</Text>
                  </View>
                  <View style={{flex: 1}}>
                  <Icon
  raised
  name='call'
  color='blue'
  onPress={() => console.log('hello')} />
                  </View>
                </View>
              }
              bottomDivider
              chevron
              leftAvatar={{ source: { uri: avatar_url } }}
            />
          )}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  /************ modals ************/
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 340,
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: 'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    height: 20,
    backgroundColor: '#20b2aa',
    padding: 20,
    margin: 10
  },
  modalInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: "#008080",
    fontWeight: 'bold'
  },
});

export default (HomeScreen);