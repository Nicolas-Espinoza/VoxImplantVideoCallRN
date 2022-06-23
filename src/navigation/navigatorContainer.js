import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { CallScreen } from '../screens/CallScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContactScreen } from '../screens/ContactScreen';
import { IncomingCallScreen } from '../screens/IncomingCallScreen';
import { CallingScreen } from '../screens/CallingScreen';
import { LoginScreen } from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'login'} screenOptions={{
                headerTitleAlign: 'center',
            }}>
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='contacts' component={ContactScreen} options={{ title: 'Contactos' }} />
                <Stack.Group screenOptions={{ headerShown: false }} >
                    <Stack.Screen name='call' component={CallScreen} />
                    <Stack.Screen name='calling' component={CallingScreen} />
                    <Stack.Screen name='incomingcall' component={IncomingCallScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer >
    )
}