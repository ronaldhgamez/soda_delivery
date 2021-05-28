import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

//import views
import MainMenu from '../src/Views/MainMenu';
import CreateMenu from '../src/Views/CreateMenu';
import PerfilSoda from '../src/Views/PerfilSoda';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
        //options={{title:'Ventana Principal'}}
        />
        <Stack.Screen
          name="CreateMenu"
          component={CreateMenu}
          //options={{title:'Ventana Crear Menú'}}
        />
        <Stack.Screen
          name="PerfilSoda"
          component={PerfilSoda}
          //options={{title:'Ventana Crear Menú'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
