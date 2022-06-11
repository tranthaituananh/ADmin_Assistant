import React, {Component} from 'react';
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
} from 'react-native';

import {AlanView} from '@alan-ai/alan-sdk-react-native';

import {NativeEventEmitter, NativeModules} from 'react-native';

const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const alanKey =
  '199226a56da7867b6331396deeb36eb22e956eca572e1d8b807a3e2338fdd0dc/stage';

export default class Voice extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image style={styles.IconoirVoice} /> */}
        <TouchableOpacity style={styles.buttonMic}>
          <AlanView projectid={alanKey} />
          <Image
            style={styles.MdiMicrophone}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A136?alt=media&token=7fcbcd40-be32-4f1a-9000-0e1b124d3de2',
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {/* <Image
          style={styles.IconoirVoice1}
          source={{uri: 'image unavailable'}}
        /> */}
      </View>
    );
  }
  componentDidMount() {
    /// Handle commands from Alan Studio

    alanEventEmitter.addListener('onEvent', payload => {
      let eventObj = JSON.parse(payload);
      switch (eventObj.name) {
        case 'recognized':
          console.info('Interim results:', eventObj.text);
          break;
        case 'parsed':
          console.info('Final result:', eventObj.text);
          break;
        case 'text':
          console.info('Alan reponse:', eventObj.text);
          break;
        default:
          console.info('Unknown event');
      }
    });
    // alanEventEmitter.addListener(
    //   'onCommand', data => {
    //   console.log(`onCommand: ${JSON.stringify(data)}`);
    // });
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
  Group4710: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  IconoirVoice: {
    width: 168,
    height: 200,
    marginBottom: 100,
    marginLeft: 15,
  },
  buttonMic: {
    //paddingTop: 24,
    //paddingBottom: 24,
    //paddingLeft: 24,
    //paddingRight: 24,
    borderRadius: 10,
    backgroundColor: 'rgba(0,172,131,1)',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  MdiMicrophone: {
    width: 30,
    height: 30,
  },

  IconoirVoice1: {
    position: 'absolute',
    top: 277,
    left: 160,
    width: 168,
    height: 200,
  },
});
