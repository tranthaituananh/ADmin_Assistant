import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  AppState,
} from 'react-native';

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
