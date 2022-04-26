import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Voice from './src/screens/Voice';
import Chat from './src/screens/Chat';

const Stack = createNativeStackNavigator();

const Navigation = props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn' screenOptions={{headerShown: false}}>
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='Chat' component={Chat} />
                <Stack.Screen name='Voice' component={Voice} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
};

export default Navigation;