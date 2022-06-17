import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Navigation from '../../Navigation';

import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const __isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const __doLogin = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      ToastAndroid.show('Please type email', ToastAndroid.LONG);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      ToastAndroid.show(error, ToastAndroid.LONG);
      setValid(false);
      return;
    } else if (!__isValidEmail(email)) {
      setError('Invalid Email');
      ToastAndroid.show(error, ToastAndroid.LONG);
      setValid(false);
      return;
    }
    let signInRequestData = {
      email,
      password,
    };

    __doSignIn(email, password);
  };

  const __doSignIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        ToastAndroid.show('Login successfully', ToastAndroid.SHORT);
        // Alert.alert('Success ✅', 'Login successfully');
        props.navigation.navigate('Chat');
      }
    } catch (e) {
      ToastAndroid.show('Login failed, please try again', ToastAndroid.SHORT);
      console.error(e.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <View style={styles.inputView}>
          <MaterialIcons
            name="email"
            size={25}
            color={isFocused ? 'rgba(0,172,131,1)' : null}
          />
          <TextInput
            placeholder="Email"
            style={styles.inputText}
            autoCapitalize="none"
            onChangeText={text => {
              setValid(__isValidEmail(text));
              setEmail(text);
            }}
            error={isValid}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>
        <View style={styles.inputView}>
          <Feather
            name="key"
            size={25}
            color={isFocused ? 'rgba(0,172,131,1)' : null}
          />
          <TextInput
            placeholder="Password"
            style={styles.inputText}
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPassword(text)}
            error={isValid}
            secureTextEntry
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>

        {error ? (
          <View style={styles.errorLabelContainerStyle}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.questionView}>
          <Text style={styles.questionText}>Forgot Password?</Text>
          <Text
            style={styles.onClickText}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            {' '}
            Click Here
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonView} onPress={__doLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.questionView}>
          <Text style={styles.questionText}>Don’t have an account?</Text>
          <Text
            style={styles.onClickText}
            onPress={() => props.navigation.navigate('SignUp')}>
            {' '}
            Sign Up
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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
  title: {
    fontSize: 32,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    //height: 60,
    alignItems: 'center',
    marginTop: '27%',
    marginBottom: '15%',
  },
  inputView: {
    //display: "flex",
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: '7%',
    //bottom: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',

    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  inputText: {
    fontSize: 13,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '200',
    color: 'rgba(0,0,0,0.74)',
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    lineHeight: 16,
    fontStyle: 'normal',
  },
  errorLabelContainerStyle: {
    marginTop: '5%',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 13,
  },

  questionView: {
    width: '100%',
    //height: 25,
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    //position: 'absolute',

    fontFamily: 'Poppins, sans-serif',
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 16,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    color: '#FFFFFF',
  },
  onClickText: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 16,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    color: '#0865D3',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '50%',
    height: 50,
    marginTop: '10%',
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
    //backgroundColor: '#000',
  },
});

export default SignIn;
