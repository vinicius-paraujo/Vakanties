import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts } from 'expo-font';

import Home from '../screens/Home';
import Dagen from '../screens/Dagen';
import Settings from '../screens/Settings';
import About from '../screens/About';

export default function AppNav() {
    const [loaded] = useFonts({
        'MADETOMMY-BOLD': require('../fonts/MADETOMMY-BOLD.otf'),
        'MADETOMMY': require('../fonts/MADETOMMY-REGULAR.otf'),
    });

    if (!loaded) {
        return null;
    }
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                    headerShown: false,
                    animation: 'none',
                }}>
                <Stack.Screen name="Vakanties" component={Home} />
                <Stack.Screen name="Dagen" component={Dagen} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="About" component={About} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

