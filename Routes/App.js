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


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          //options={{title:'Ventana Crear Menú'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
