import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  AppState,
} from 'react-native';
<<<<<<< HEAD
// import SignIn from './src/screens/SignIn';
// import SignUp from './src/screens/SignUp';
// import Chat from './src/screens/Chat';
// import Voice from './src/screens/Voice';
// import ForgotPassword from './src/screens/ForgotPassword';
// import ResetPassword from './src/screens/ResetPassword';
=======
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Chat from './src/screens/Chat';
import Voice from './src/screens/Voice';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
>>>>>>> 53c0c4cfc40725a432ee07cd14322b9f844e2439

import Navigation from './Navigation';

export default function App() {
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  // const handleAppStateChange = nextAppState => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('ADmin has come to the foreground!');
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);

  //   console.log('ADmin State: ', appState.current);
  // };
  return <Navigation />;
}
