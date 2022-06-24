import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetStarted = props => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../image/logoApp.png')} style={styles.logo} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Welcome to ADmin Assistant</Text>
        <View style={{marginTop: '3%', flexDirection: 'row'}}>
          <FontAwesome5
            name="hand-point-right"
            size={23}
            color="#000"
            style={{marginRight: 2}}
          />
          <FontAwesome5
            name="hand-point-right"
            size={23}
            color="#000"
            style={{marginRight: 2}}
          />
          <FontAwesome5
            name="hand-point-right"
            size={23}
            color="#000"
            style={{marginRight: 2}}
          />
          <Text style={styles.slogan}>Small talk, Big fun!</Text>
        </View>
        <View style={styles.btnGroupView}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Get Started</Text>
            <FontAwesome5 name="arrow-right" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//UI Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(41,47,63,1)',
    shadowColor: 'rgba(24,48,63,0.5)',
    shadowOffset: {width: 40, height: 40},
    width: windowWidth,
    height: windowHeight,
  },

  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 1,
    width: '100%',
    height: windowHeight / 2,
    backgroundColor: 'rgba(0,172,131,0.6)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    padding: 10,
  },

  logo: {
    width: 160,
    height: 160,
    borderRadius: 120,
  },

  title: {
    fontSize: 25,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'left',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    marginTop: '5%',
  },

  slogan: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '200',
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 20,
    display: 'flex',
    textAlign: 'left',
    color: '#FFFFFF',
    marginLeft: 10,
    marginRight: 10,
  },

  btnGroupView: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: '7%',
  },

  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '50%',
    height: 50,
    borderRadius: 13.06,
    backgroundColor: 'rgba(0,172,131,1)',
  },

  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    marginRight: 20,
  },
});

export default GetStarted;
