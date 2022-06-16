import React, {useState, useEffect} from 'react';
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

import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/database';
import uuid from 'react-native-uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = props => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [isValid, setValid] = useState(true);

  const __isValidEmail = email => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const _doSignUp = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    }
    if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      return;
    }
    if (!__isValidEmail(email)) {
      setError('Invalid Email');
      setValid(false);
      return;
    }

    __doCreateUser(email, password).then(savedUser());
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
      let response = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => props.navigation.navigate('SignIn'));
      if (response && response.user) {
        Alert.alert('Success ✅', 'Account created successfully');
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
          <Feather name="user" size={25} />
          <TextInput
            placeholder="Fullname"
            style={styles.inputText}
            autoCapitalize="none"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Feather name="mail" size={25} />
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
          />
        </View>
        <View style={styles.inputView}>
          <Feather name="key" size={25} />
          <TextInput
            placeholder="Password"
            style={styles.inputText}
            autoCapitalize="none"
            value={password}
            error={isValid}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
        </View>

        {error ? (
          <View style={styles.errorLabelContainerStyle}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.forgotPassView}>
          <Text style={styles.questionText}>I agree to the UNICEF</Text>
          <TouchableOpacity>
            <Text style={styles.onClickText}> Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonView} onPress={_doSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.forgotPassView}>
          <Text style={styles.questionText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.onClickText}> Sign In</Text>
          </TouchableOpacity>
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

    paddingLeft: 10,
    paddingRight: 10,
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
    height: 60,
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 15,
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
    //lineHeight: 20,
    fontStyle: 'normal',
  },

  forgotPassView: {
    width: '100%',
    height: 25,
    marginTop: 30,
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
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 17,
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
    //paddingTop: 7,
    //paddingBottom: 11,
    //paddingLeft: 32,
    //paddingRight: 32.15,
    //marginBottom: 28,
    marginTop: 36,
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

export default SignUp;
