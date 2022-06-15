import React, {
  Component,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Linking,
  Alert,
  Platform,
} from 'react-native';

import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Message from './component/Message';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

// const alanKey =
//   '199226a56da7867b6331396deeb36eb22e956eca572e1d8b807a3e2338fdd0dc/stage';

const alanKey =
  '087ceaf34fe1d0396eac8ce8d828fcfd2e956eca572e1d8b807a3e2338fdd0dc/stage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const Chat = props => {
  // const [name, setName] = useState();
  // const getFullname = () => {
  //   database()
  //     .ref('/users/' + uuid.v4())
  //     .once('value')
  //     .then(snapshot => {
  //       console.log('User data: ', snapshot.val());
  //     });
  // };
  // useEffect(() => {
  //   getFullname();
  // });

  const [messages, setMessages] = useState([]);
  const [isLeft, setIsLeft] = useState(true);
  const [inputText, setInputText] = useState('');

  const user = useRef(0);
  const scrollView = useRef();
  //const time = new Date().getTime;

  // const getMessages = () => {
  //   messages.map((message, index) => (
  //     <Message
  //       key={index}
  //       time={message.time}
  //       isLeft={message.user !== user.current}
  //       message={message.content}
  //     />
  //   ));
  // };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.grpTitleView}>
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A132?alt=media&token=a3d24d05-a29e-4d41-9c65-394308556e94',
          }}
        />
        <Text style={styles.userName}>ADmin Assistant</Text>
      </View>

      <ScrollView
        style={styles.chatFrameView}
        ref={ref => (scrollView.current = ref)}
        onContentChange={() => {
          scrollView.current.scrollToEnd({animated: true});
        }}>
        <AlanView projectid={alanKey} />

        {useEffect(() => {
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
          alanEventEmitter.addListener('onEvent', payload => {
            let eventObj = JSON.parse(payload);

            switch (eventObj.name) {
              case 'recognized':
                console.info('Interim results:', eventObj.text);
                break;
              case 'parsed':
                console.info('Final result:', eventObj.text);
                messages.push({
                  user: 0,
                  //time:
                  content: eventObj.text,
                });

                break;
              case 'text':
                console.info('Alan reponse:', eventObj.text);
                messages.push({
                  user: 1,
                  //time:
                  content: eventObj.text,
                });
                break;
              default:
                console.info('Unknown event');
            }
          });
          return () => {
            alanEventEmitter.removeAllListeners('onCommand');
            alanEventEmitter.removeAllListeners('onEvent');

            AlanManager.deactivate();
            //messages.splice(0, messages.length);
          };
        }, [])}
        {messages.map((message, index) => (
          <Message
            key={index}
            time={message.time}
            isLeft={message.user !== user.current}
            message={message.content}
          />
        ))}
        {console.log(messages)}
      </ScrollView>

      <View style={styles.grpFeatureView}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Write"
            placeholderTextColor={'rgba(255, 255, 255, 0.55)'}
            style={styles.inputText}
            color="#fff"
            //value={messages}
            onChangeText={text => setInputText(text)}
          />
          <TouchableOpacity
            onPress={() => {
              messages.push({user: 0, content: inputText});
            }}>
            <Image
              style={styles.buttonSentImg}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A119?alt=media&token=83d60199-0897-47d4-a189-83080290f804',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={styles.buttonFeature}
          // onPress={() => this.props.navigation.navigate('Voice')}
        >
          <Image
            style={styles.MdiMicrophone}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A136?alt=media&token=7fcbcd40-be32-4f1a-9000-0e1b124d3de2',
            }}
            resizeMode="center"
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.buttonFeature}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Image
            style={styles.cameraImg}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A113?alt=media&token=59ce58d5-54e1-4843-a1ff-6f53d2a75f8b',
            }}
            resizeMode="center"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 7,
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
    height: '9%',
    justifyContent: 'flex-start',
    borderBottomWidth: 1 / 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    //backgroundColor: '#fff',
    //marginBottom: 623,
  },
  avatar: {
    width: '14%',
    height: '92%',
    //marginLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 100,
    //marginRight: 114,
  },
  userName: {
    width: '86%',
    fontSize: 18,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //textTransform: 'capitalize',
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

  //MessageBubble

  messageBubble: {
    borderRadius: 5,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    flex: 1,
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },

  messageBubbleTextLeft: {
    color: 'black',
  },

  messageBubbleRight: {
    backgroundColor: '#66db30',
  },

  messageBubbleTextRight: {
    color: 'white',
  },
});
