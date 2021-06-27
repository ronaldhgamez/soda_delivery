import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//import views
import auxiliar from '../src/Views/auxiliar'
import MainMenu from '../src/Views/MainMenu';
import CreateMenu from '../src/Views/CreateMenu';
import SodasPerfilOriginal from '../src/Views/SodasPerfilOriginal'
import ModifySoda from '../src/Views/ModifySoda';
import ProfileScreen from '../src/Views/ProfileScreen';
import Login from '../src/Views/Login'
import Register from '../src/Views/Register'
import Orders from '../src/Cafe_Views/Orders'
import Menu from '../src/Cafe_Views/Menu'

import {LogBox} from 'react-native'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Auxiliar"
          component={auxiliar}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
        />
        <Stack.Screen
          name="CreateMenu"
          component={CreateMenu}
        />
        <Stack.Screen
          name="SodasPerfilOriginal"
          component={SodasPerfilOriginal}
        />
        <Stack.Screen
          name="ModifySoda"
          component={ModifySoda}
        />
        <Stack.Screen
          name='ProfileScreen'
          component={ProfileScreen}
        />
        <Stack.Screen
          name='Register'
          component={Register}
        />
        <Stack.Screen
          name='Orders'
          component={Orders}
        />
        <Stack.Screen
          name='Menu'
          component={Menu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
