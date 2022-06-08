import React, {Component} from 'react';
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
} from 'react-native';

import {AlanView} from '@alan-ai/alan-sdk-react-native';

import {NativeEventEmitter, NativeModules} from 'react-native';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const alanKey =
  '199226a56da7867b6331396deeb36eb22e956eca572e1d8b807a3e2338fdd0dc/stage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputBarText: '',
      results: null,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AlanView projectid={alanKey} />
        <View style={styles.grpTitleView}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A132?alt=media&token=a3d24d05-a29e-4d41-9c65-394308556e94',
            }}
          />
          <Text style={styles.userName}>Trần Thái Tuấn Anh</Text>
        </View>

        <ScrollView>
          <View style={styles.chatFrameView}>
            <Text>Data</Text>
          </View>
        </ScrollView>

        <View style={styles.grpFeatureView}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Write"
              placeholderTextColor={'rgba(255, 255, 255, 0.55)'}
              style={styles.inputText}
              color="#fff"
            />
            <TouchableOpacity>
              <Image
                style={styles.buttonSentImg}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A119?alt=media&token=83d60199-0897-47d4-a189-83080290f804',
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
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
          </TouchableOpacity>

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
  }

  componentDidMount() {
    /// Handle commands from Alan Studio
    alanEventEmitter.addListener('onCommand', data => {
      console.log(`onCommand: ${JSON.stringify(data)}`);
    });
  }

  componentWillUnmount() {
    alanEventEmitter.removeAllListeners('onCommand');
  }
}

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
    height: 45,
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
