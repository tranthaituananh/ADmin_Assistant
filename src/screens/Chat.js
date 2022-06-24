import React, {useState, useEffect, useRef} from 'react';

import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Message from './component/Message';
import ModalItem from './component/ModalItem';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
const alanKey =
  '087ceaf34fe1d0396eac8ce8d828fcfd2e956eca572e1d8b807a3e2338fdd0dc/stage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Mở  web theo url mà người dùng đưa vào bằng giọng nói
const openURL = async url => {
  const isSupported = await Linking.canOpenURL(url);
  if (isSupported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Can't open this URL: ${url}!`);
  }
};

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Chat = props => {
  const [messages, setMessages] = useState([]);
  // const [isLeft, setIsLeft] = useState(true);
  const user = useRef(0);
  const scrollView = useRef();

  const [apps, setApps] = useState([
    {
      name: 'youtube',
      url: 'https://www.youtube.com',
    },
    {
      name: 'spotify',
      url: 'https://open.spotify.com/playlist/5Jve4LdPwiHplGKlZ9nSOe?si=08e4c966c13c44c4&nd=1',
    },
    {
      name: 'instagram',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'facebook',
      url: 'https://www.facebook.com/',
    },
    {
      name: 'google-maps',
      url: 'https://www.google.com/maps/',
    },
    {
      name: 'google-photos',
      url: 'https://photos.google.com/u/',
    },
    {
      name: 'google-assistant',
      url: 'https://assistant.google.com/',
    },
    {
      name: 'uit',
      url: 'https://play.google.com/store/apps/details?id=app.uit.edu.uit ',
    },
  ]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const changeModalVisibility = boolean => {
    setModalVisible(boolean);
  };

  return (
    <SafeAreaView
      style={[styles.container, {opacity: isModalVisible ? 0.8 : null}]}>
      <View style={styles.grpTitleView}>
        <TouchableOpacity
          style={styles.avatarView}
          onPress={() => changeModalVisibility(true)}>
          <Image
            style={styles.avatar}
            source={require('../image/logoApp.png')}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => changeModalVisibility(false)}>
          <ModalItem
            changeModalVisibility={changeModalVisibility}
            navigate={props.navigation.navigate}
          />
        </Modal>
        <Text style={styles.userName}>ADmin Assistant</Text>
      </View>

      <View style={styles.chatFrameView}>
        <ScrollView
          style={{width: '100%', height: '80%'}}
          ref={ref => (scrollView.current = ref)}
          onContentChange={() => {
            scrollView.current.scrollToEnd({animated: true});
          }}
          overScrollMode="auto"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <AlanView projectid={alanKey} />
          {useEffect(() => {
            alanEventEmitter.addListener('onCommand', data => {
              console.log(`onCommand: ${JSON.stringify(data)}`);
              for (var index = 0; index < apps.length; index++) {
                if (data.command == apps[index].name) {
                  openURL(apps[index].url);
                }
              }
              //Thực hiện 1 số thao tác chuyển tiếp màn hình bên trong app
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
                case 'goReadText':
                  props.navigation.navigate('ReadText');
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
                    content: eventObj.text,
                  });
                  break;
                case 'text':
                  console.info('Alan response:', eventObj.text);
                  messages.push({
                    user: 1,
                    content: eventObj.text,
                  });
                  break;
                default:
                  console.info('Unknown event');
              }
            });
            setMessages(messages);

            return () => {
              alanEventEmitter.removeAllListeners('onCommand');
              alanEventEmitter.removeAllListeners('onEvent');
              AlanManager.deactivate();
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
        </ScrollView>
      </View>

      <View style={styles.grpFeatureView}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Write"
            placeholderTextColor={'rgba(255, 255, 255, 0.55)'}
            style={[
              styles.inputText,
              isFocused && {borderColor: 'rgba(255, 255, 255, 0.55)'},
            ]}
            color="#fff"
            value={inputText}
            onChangeText={text => setInputText(text)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          <TouchableOpacity
            style={[
              styles.buttonSentImg,
              {
                backgroundColor: isFocused
                  ? 'rgba(0,172,131,1)'
                  : 'rgb(55,62,78)',
              },
            ]}
            onPress={() => {
              messages.push({user: 0, content: inputText}), setInputText('');
              AlanManager.activate();
              AlanManager.callProjectApi(
                'handleText',
                {user: 0, content: inputText},
                (error, result) => {
                  if (error) {
                    console.error(error);
                  }
                },
              );
            }}>
            <Feather
              name={isFocused ? 'send' : 'message-circle'}
              size={27}
              color={isFocused ? 'rgb(255,255,255)' : 'rgb(165,168,175)'}
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonFeature}
          onPress={() => props.navigation.navigate('ReadText')}>
          <Ionicons
            name="book-sharp"
            size={27}
            style={{
              paddingTop: 4,
              paddingLeft: 2,
            }}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//UI Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'rgba(41,47,63,1)',
    shadowColor: 'rgba(24,48,63,0.5)',
    shadowOffset: {width: 40, height: 40},
    width: windowWidth,
    height: windowHeight,
  },

  grpTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '9%',
    justifyContent: 'flex-start',
    borderBottomWidth: 1 / 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
  },

  avatarView: {
    width: '14%',
    height: '92%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 100,
  },

  avatar: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 100,
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
  },

  chatFrameView: {
    display: 'flex',
    width: '100%',
    height: '85%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },

  grpFeatureView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '8%',
    marginBottom: 5,
  },

  inputView: {
    paddingLeft: 10,
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
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Chat;
