import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
  Platform,
} from 'react-native';

import {AlanView} from '@alan-ai/alan-sdk-react-native';

import {NativeEventEmitter, NativeModules} from 'react-native';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const alanKey =
  '087ceaf34fe1d0396eac8ce8d828fcfd2e956eca572e1d8b807a3e2338fdd0dc/stage';

const number = '+84 795164691';
const openURL = async url => {
  const isSupported = await Linking.canOpenURL(url);
  if (isSupported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Can't open this URL: ${url}!`);
  }
};

const openPhotos = () => {
  if (Platform.OS === 'android') {
    Linking.openURL('content://media/internal/images/media');
  } else if (Platform.OS === 'ios') {
    Linking.openURL('photos-redirect://');
  } else {
    Alert.alert("Can't open gallery");
  }
};

const Voice = props => {
  const [apps, setApps] = useState([
    {
      name: 'youtube',
      url: 'https://www.youtube.com',
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'google-maps',
      url: 'https://www.google.com/maps/',
    },
    {
      name: 'google-assistant',
      url: 'https://assistant.google.com/',
    },
    {
      name: 'uit',
      url: 'https://play.google.com/store/apps/details?id=app.uit.edu.uit ',
    },
    {
      name: `call ${number}`,
      url: `tel:${number}`,
    },
  ]);

  useEffect(() => {
    alanEventEmitter.addListener('onCommand', data => {
      console.log(`onCommand: ${JSON.stringify(data)}`);
      for (var index = 0; index < apps.length; index++) {
        if (data.command == apps[index].name) {
          openURL(apps[index].url);
        }
      }
      switch (data.navigate) {
        case 'goSignIn':
          props.navigation.navigate('SignIn');
          break;
        case 'goSignUp':
          props.navigation.navigate('SignUp');
          break;
        case 'goSignOut':
          props.navigation.navigate('SignIn');
          break;
        case 'goChat':
          props.navigation.navigate('Chat');
          break;
        case 'goVoice':
          props.navigation.navigate('Voice');
          break;
        default:
          break;
      }
    });
    return () => {
      alanEventEmitter.removeAllListeners('onCommand');
      //messages.splice(0, messages.length);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AlanView projectid={alanKey} />
      <TouchableOpacity
        style={{
          backgroundColor: 'pink',
          borderRadius: 10,
          //width: '70%',
          height: 50,
          marginBottom: 20,
          marginTop: 20,
        }}
        onPress={() => {
          Linking.openURL(`https://www.youtube.com`);
        }}>
        <Text>YOUTUBE</Text>
      </TouchableOpacity>
      <Button
        title="MAP"
        color="blue"
        onPress={() => {
          Linking.openURL(`https://www.google.com/maps/`);
        }}></Button>
      <Button
        title="Zalo"
        color="blue"
        onPress={() => {
          openURL(`https://zalo.me/${number}`);
        }}></Button>
      <Button
        title="Busmap"
        color="blue"
        onPress={() => {
          openURL(`https://busmap.vn`);
        }}></Button>
      <Button
        title="Gallery"
        color="blue"
        onPress={() => {
          openPhotos();
        }}></Button>

      <Button
        title="Instagram"
        color="blue"
        onPress={() => {
          openURL('https://www.instagram.com/');
        }}></Button>
      <Button
        title="Facebook"
        color="blue"
        onPress={() => {
          openURL('https://www.facebook.com/');
        }}></Button>
      <Button
        title="Call"
        color="blue"
        onPress={() => {
          openURL(`tel:${number}`);
        }}></Button>
      <Button
        title="SMS"
        color="blue"
        onPress={() => {
          openURL(`sms:`);
        }}></Button>
      <Button
        title="Shopee"
        color="blue"
        onPress={() => {
          openURL(`https://shopee.vn/`);
        }}></Button>
      <Button
        title="Assistant"
        color="blue"
        onPress={() => {
          openURL(`https://assistant.google.com/`);
        }}></Button>
    </SafeAreaView>
  );
};

export default Voice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'rgba(41,47,63,1)',
    shadowColor: 'rgba(24,48,63,0.5)',
    //elevation: 10,
    shadowOffset: {width: 40, height: 40},
    width: windowWidth,
    height: windowHeight,
  },
  grpTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingTop: 5,
    width: '100%',
    height: 50,
    justifyContent: 'flex-start',
    //backgroundColor: '#fff',
    //marginBottom: 623,
  },
  avatar: {
    width: 45,
    height: 45,
    //marginLeft: 5,
    //justifyContent: 'flex-start'
    //marginRight: 114,
  },
  userName: {
    fontSize: 15,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '400',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'right',
    left: 0.3 * windowWidth,
    justifyContent: 'flex-end',
    //alignItems: 'flex-end',
    textTransform: 'capitalize',
  },
  chatFrameView: {
    //display:'flex',
    width: '100%',
    height: '80%',
    //backgroundColor: "rgba(41,47,63,1)",
  },

  grpFeatureView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 40,
    marginBottom: 5,
  },
  inputView: {
    //paddingTop: 10,
    //paddingBottom: 11,
    paddingLeft: 10,
    //paddingRight: 2,
    //padding: 7,
    marginLeft: 3,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    width: '70%',
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '400',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.6)',
    width: '80%',
    height: '100%',
    textAlign: 'left',
    justifyContent: 'center',
    marginRight: 8,
  },

  buttonFeature: {
    //paddingTop: 11,
    //paddingBottom: 11,
    //paddingLeft: 11,
    //paddingRight: 12,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(0,172,131,1)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },

  MdiMicrophone: {
    width: 18,
    height: 18,
  },

  Group161: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,172,131,1)',
    width: 40,
    height: 40,
  },
  cameraImg: {
    width: 20,
    height: 18,
  },

  buttonSentImg: {
    //position: "absolute",
    width: 40,
    height: 40,
  },
});
