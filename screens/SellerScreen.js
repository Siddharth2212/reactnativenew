import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TextInput, Dimensions, ScrollView, Alert } from 'react-native';
import { Text, Button, Icon, Overlay, Card, Divider } from 'react-native-elements';
import auth, { firebase } from "@react-native-firebase/auth"
import ImagePicker from 'react-native-image-picker'
import S3 from 'aws-sdk/clients/s3';
import * as fs from 'react-native-fs';
import { decode } from "base64-arraybuffer"
import {Loading} from "../components/LoadingComponent"

export default function SellerScreen({ navigation }) {
  const [authuser, setAuthUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [showAbout, setShowAbout] = useState("");
  const [visibleAbout, setVisibleAbout] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [avatarSource, setAvatarSource] = useState("");
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(false);

  const width = Dimensions.get('window').width; //full width

  const createTwoButtonAlert = () =>
  Alert.alert(
    "Event Added",
    "Event has been added to your profile. Click on Add event button to add more events",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );


  const toggleOverlay = () => {
    setVisible(!visible);
    console.log("visible");
    console.log(visible);
    setAvatarSource("");
  };

  const toggleAboutOverlay = () => {
    setVisibleAbout(!visibleAbout);
  };

  const handleChoosePhoto = async () => {
    console.log("hereee");
    let options = {
      quality: 0.25,
      title: "Upload Prescription",
      takePhotoButtonTitle: "Take a Photo",
      chooseFromLibraryButtonTitle: "Select From Gallery",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
        alert(response.customButton);
      } else {
        console.log("aeigaheiogaheighaioeghaioeghaigh");
        console.log(response);
        const file = {
          uri: response.uri,
          name: response.fileName,
          type: "image/jpeg",
        };
        uploadImageOnS3(file);
      }
    });
  };

  const uploadImageOnS3 = async (file) => {
    setLoader(true);
    const s3bucket = new S3({
      accessKeyId: "AKIAIFT5V5KLNL4IXTLA",
      secretAccessKey: "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",
      Bucket: "qutu",
      signatureVersion: 'v4',
    });
    let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + file.name + '"';
    const base64 = await fs.readFile(file.uri, 'base64');
    console.log("__here_____");
    const arrayBuffer = decode(base64);
    console.log(arrayBuffer);
    s3bucket.createBucket(() => {
      const params = {
        Bucket: "qutu",
        Key: file.name,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      };
      s3bucket.upload(params, function(err, data){
        setLoader(false)
        setAvatarSource({uri: data.Location})
        if (err) {
          console.log('error in callback');
        }
        console.log('success');
        console.log("Respomse URL : " + data.Location);
      }).on('httpUploadProgress', function(evt) {
          // console.log(evt);
          console.log(("Uploading :: " + parseInt((evt.loaded * 100) / evt.total)+'% completed'))
          // el.children('.progress').html("Uploading :: " + parseInt((evt.loaded * 100) / evt.total)+'% completed');
      })
    });
  };

  const addEvent = () => {
    let obj = {};
    obj.eventName = eventName;
    obj.eventDescription = eventDescription;
    obj.avatarSource = avatarSource;
    setResult(result => [...result, obj]);
    // console.log(result);
    setVisible(!visible);
    createTwoButtonAlert();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged in ___');
        // console.log(user.phoneNumber);
        setAuthUser(user);
        console.log(authuser);
        // props.addProfile(user.phoneNumber, "Rishabh Sogani");
      }
    });
  }, []);

  const events = result.map((u, i) => {
    return (
      <Card
        imageProps={{ resizeMode: 'cover' }}
        title={u.eventName}
        imageStyle={{width: 3096, height: 4128}}
        image={{ uri: u.avatarSource.uri }}
      >
        <Text style={{ marginBottom: 10 }}>
          {u.eventDescription}
        </Text>
        <Button
          icon={<Icon name='edit' color='#ffffff' />}
          onPress={toggleOverlay}
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Edit Event' />
      </Card>
    );
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
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
        <Text style={styles.getStartedText}>Hi {authuser.displayName}:</Text>
        <Text style={styles.getStartedText}>
          {"Add Biography and Events of your life"}
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.textLabel}>{'About'.toUpperCase()}</Text>
        {showAbout !== "" &&
          <Text style={styles.textLabel}>{showAbout}</Text>
        }
        <Button
          type="clear"
          icon={
            <Icon
              raised
              name={showAbout == "" ? "info-circle" : "edit"}
              type='font-awesome'
              color='#f50' />
          }
          title={showAbout == "" ? 'Add About'.toUpperCase() : 'Update About'.toUpperCase()}
          onPress={toggleAboutOverlay}
        />
      </View>
      <Divider />
      <View style={{ padding: 10 }}>
        <Text style={styles.textLabel}>{'Add events of your life'.toUpperCase()}</Text>
        {events}

        <Button
          type="clear"
          icon={
            <Icon
              raised
              name='calendar-o'
              type='font-awesome'
              color='#f50' />
          }
          title={"Add Event".toUpperCase()}
          onPress={toggleOverlay}
        />

      </View>
      <Overlay overlayStyle={{ width: width - 10 }} isVisible={visibleAbout} onBackdropPress={toggleAboutOverlay}>
        <Text style={styles.textLabel}>{showAbout == "" ? 'Add About'.toUpperCase() : 'Update About'.toUpperCase()}</Text>
        <TextInput value={showAbout} placeholder={"Describe yourself in few words".toUpperCase()} onChangeText={(text) => setShowAbout(text)} style={styles.textInput} />
        <Button
          type="clear"
          icon={
            <Icon
              raised
              name='arrow-circle-right'
              type='font-awesome'
              color='#f50'
              onPress={() => console.log('hello')}
            />
          }
          title={showAbout == "" ? 'Add About'.toUpperCase() : 'Update About'.toUpperCase()}
          onPress={toggleAboutOverlay}
        />
      </Overlay>
      <Overlay overlayStyle={{ width: width - 10 }} isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textLabel}>{'Add event'.toUpperCase()}</Text>
        <TextInput placeholder={"Name of event".toUpperCase()} onChangeText={(text) => setEventName(text)} style={styles.textEventNameInput} />
        <TextInput placeholder={"Describe event".toUpperCase()} onChangeText={(text) => setEventDescription(text)} style={styles.textEventDescriptionInput} />
        {avatarSource !== "" && (

          <>
            <Image
              source={{ uri: avatarSource.uri }}
              style={{ width: width - 30, height: 300 }}
            />
            <Button
              type="clear"
              icon={
                <Icon
                  raised
                  name='upload'
                  type='font-awesome'
                  color='#f50'
                  onPress={() => console.log('hello')}
                />
              }
              title="Update Photo"
              onPress={handleChoosePhoto}
            />
            <Button
              icon={
                <Icon
                  raised
                  name='check'
                  type='font-awesome'
                  color='#f50'
                  onPress={() => console.log('hello')}
                />
              }
              title="Add Event"
              onPress={addEvent}
            />
          </>
        )}
       
        {loader && (
           <Loading text="Uploading" />
        )}
        {avatarSource == "" && (
          <Button
            type="clear"
            icon={
              <Icon
                raised
                name='upload'
                type='font-awesome'
                color='#f50'
                onPress={() => console.log('hello')}
              />
            }
            title={"Add a Photo To This Event".toUpperCase()}
            onPress={handleChoosePhoto}
          />
        )}

      </Overlay>
    </ScrollView>
  );
}

SellerScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  textLabel: {
    color: 'grey',
    fontSize: 13,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 200
  },
  textEventNameInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  textEventDescriptionInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 175
  },
});
