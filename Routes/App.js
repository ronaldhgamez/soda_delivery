import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//import views
import MainMenu from '../src/Views/MainMenu';
import CreateMenu from '../src/Views/CreateMenu';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
        />
        <Stack.Screen
          name="CreateMenu"
          component={CreateMenu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
