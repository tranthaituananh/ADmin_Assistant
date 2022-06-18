import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ReadText from './src/screens/ReadText';
import Chat from './src/screens/Chat';
import ForgotPassword from './src/screens/ForgotPassword';
import ResetPassword from './src/screens/ResetPassword';
import Loading from './src/screens/Loading';

const Stack = createNativeStackNavigator();

import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="ReadText" component={ReadText} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
