import React, {useState, useEffect} from 'react';
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
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const __isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const _doSignUp = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      ToastAndroid.show(error, ToastAndroid.LONG);
      return;
    }
    if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      ToastAndroid.show(error, ToastAndroid.LONG);
      return;
    }
    if (!__isValidEmail(email)) {
      setError('Invalid Email');
      setValid(false);
      ToastAndroid.show(error, ToastAndroid.LONG);
      return;
    }

    __doCreateUser(email, password);
  };

  const savedUser = async () => {
    if (name == '' || email == '' || password == '') {
      ToastAndroid.show('Please fill in all the fields!', ToastAndroid.SHORT);
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: name,
      email: email,
      password: password,
    };
    firebase
      .app()
      .database(
        'https://console.firebase.google.com/u/0/project/admin-assistant-d4922/database/admin-assistant-d4922-default-rtdb/data/~2F',
      )
      .ref('/users/' + data.uuid)
      .push(data)
      .then(ToastAndroid.show('Register successfully!', ToastAndroid.SHORT));
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response && response.user) {
        ToastAndroid.show('Register successfully!', ToastAndroid.SHORT);
        props.navigation.navigate('SignIn');
        Alert.alert('Success ✅', 'Account created successfully');
        savedUser();
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputView}>
          <Feather
            name="user"
            size={25}
            color={isFocused ? 'rgba(0,172,131,1)' : null}
          />
          <TextInput
            placeholder="Fullname"
            style={styles.inputText}
            autoCapitalize="none"
            value={name}
            onChangeText={text => setName(text)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>
        <View style={styles.inputView}>
          <Feather
            name="mail"
            size={25}
            color={isFocused ? 'rgba(0,172,131,1)' : null}
          />
          <TextInput
            placeholder="Email"
            style={styles.inputText}
            autoCapitalize="none"
            value={email}
            onChangeText={text => {
              setError;
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
            error={isValid}
            onChangeText={text => setPassword(text)}
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
          <Text style={styles.questionText}>I agree to ADmin Assistant</Text>
          <Text style={styles.onClickText}> Terms and Conditions</Text>
        </View>

        <TouchableOpacity style={styles.buttonView} onPress={_doSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.questionView}>
          <Text style={styles.questionText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.onClickText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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

  title: {
    fontSize: 32,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '5%',
  },

  inputView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: '7%',
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
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  questionText: {
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
  },
});

export default SignUp;