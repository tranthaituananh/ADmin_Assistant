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
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ResetPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const resetPassword = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        Alert.alert(
          //title
          'Reset Password',
          //body
          `A link is sent to ${email} to reset your password. Please check your email and sign in again`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn'),
            },
          ],
        );
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.grpTitleView}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Reset Password</Text>

        <View style={styles.noticeView}>
          <Text style={styles.questionText}>
            Enter the email address associated with your account and we'll send
            a link to your email to reset your password
          </Text>
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
              setEmail(text);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonView}
          onPress={() => {
            resetPassword(email);
          }}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>

        <View style={styles.forgotPassView}>
          <Text style={styles.questionText}>
            Don't need to change password?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.onClickText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

//UI Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
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
  },

  buttonBack: {
    width: 50,
    height: 45,
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
    marginBottom: 10,
  },

  inputView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    padding: 5,
    marginTop: 15,
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

  noticeView: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  forgotPassView: {
    width: '100%',
    marginTop: 30,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: 14,
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
  },
});
