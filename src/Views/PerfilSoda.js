import React, { Component } from 'react';
import { View,Picker } from 'react-native';
import style from '../Styles/PerfilSoda_Style';
import {Text,Icon,Button,Input} from 'react-native-elements';


class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      value: 0,
      PickerSelectedVal: ''
    };
  }

  render() {
    return (
      <View style={style.container}>
        <Text style = {style.logo}> Perfil Soda</Text>
          <Input
          placeholder='Nombre - soda'
          leftIcon={
          <Icon
           name='edit'
           type="font-awesome"
           size={24}
           color='black'
         />
         } 
        />
        <Input
          placeholder='Propietario'
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />

        <Input
          placeholder='Descripcion'
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />
        <Input
          placeholder='Direccion exacta'
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />
        <Input
          placeholder='Tipo comida'
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />
        <Input
          placeholder='Contraseña'
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />

        <Input
          placeholder='usuario'
          
          leftIcon={
          <Icon
           name='edit'
           type= 'font-awesome'
           size={24}
           color='black'
         />
         } 
        />
    

        <Button
          icon={{
          name: "arrow-right",
          size: 15,
          color: "white"
        }}
        title="Modificar"
        />

      <Icon 
        raised
            name="trash" 
            type='ionicon'
            color='#f50'
            size={20}
            onPress={() => console.log('borrando')}
        />
        
      </View>
    );
  }
}

export default ModifySoda;
