import React, { Component, useState } from 'react';
import { View,Picker,TextInput } from 'react-native';
import style from '../Styles/ModifySoda_Style';
import {Text,Icon,Button} from 'react-native-elements';


class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:"",
      dueno:"",
      descrip:"",
      direccion:"",
      tipoComida:"",
      contrasena:"",
      usuario:"",
      spinner: false,
      value: 0,
      PickerSelectedVal: ''
    };
  }

  //consultar el nombre de soda y si es igual hacer la modificacion o eliminar
  solicitud = () => {
      
  }

  render() {
    return (
      <View style={style.container}>
        <Text></Text>
        <Text style = {style.logo}> Modificar Soda</Text>

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
          <TextInput placeholder='Nombre - soda'
          style={style.input}
          onChangeText={value => this.setState({ comment: value })}  
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
        <TextInput
          placeholder='Propietario'
          style={style.input}
          onChangeText={value => this.setState({ comment: value })} 
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
        <TextInput
          placeholder='Descripcion'
          style={style.input}
          onChangeText={value => this.setState({ comment: value })} 
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/> 
        <TextInput
          placeholder='Direccion exacta' 
          style={style.input}
          onChangeText={value => this.setState({ comment: value })} 
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
        <TextInput
          placeholder='Tipo comida'
          style={style.input} 
          onChangeText={value => this.setState({ comment: value })} 
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
        <TextInput
          placeholder='Contraseña'
          style={style.input}
          onChangeText={value => this.setState({ comment: value })} 
        />

        <Icon name='edit'type="font-awesome"size={15} color='black'/>
        <TextInput
          placeholder='usuario'
          style={style.input}
          onChangeText={value => this.setState({ comment: value })} 
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
