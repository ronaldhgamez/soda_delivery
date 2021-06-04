import React, { Component, useState } from 'react';
import { View, Picker, TextInput } from 'react-native';
import style from '../Styles/ModifySoda_Style';
import { Text, Icon, Button } from 'react-native-elements';
import sodasFuntion from '../Components/sodasFuntion'
import { addMenu } from "../Utilities/CreateMenuCon";

class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      dueno: "",
      descrip: "",
      direccion: "",
      tipoComida: "",
      user: "",
      spinner: false,
      value: 0,
      PickerSelectedVal: '',
      setMsj: ''
    };
  }

  //------------
  modificarSoda = (nombre, dueno, descripcion, direccion, tipoComida, usuario) => {
    console.log("entra");
    if (true) {
      console.log('Soda modificada');
    } else {
      console.log("invalido")
    }
  }

  eliminar = () => {
    //const res = await db.collection('cafes').doc('DC').delete();
  }

  //Create the menu
  createMenu = async () => {
    let idInserted = await addMenu({ idSoda: "1", descripcion: "HELLO" });
    this.setState({ idInserted: idInserted });
  }

  render() {
    return (
      <View style={style.container}>
        <Text></Text>
        <Text style={style.logo}> Modificar Soda</Text>
        <Icon name='edit' type="font-awesome" size={35} color='black' />

        <Text>Soda</Text>

        <TextInput placeholder='Nombre - soda'
          style={style.input}
          onChangeText={value => this.setState({ nombre: value })}
        />

        <Text>Dueño</Text>


        <TextInput
          placeholder='Propietario'
          style={style.input}
          onChangeText={value => this.setState({ dueno: value })}
        />

        <Text>Descripcion</Text>


        <TextInput
          placeholder='Descripcion'
          style={style.inputdescripcion}
          onChangeText={value => this.setState({ descrip: value })}
        />

        <Text>Direccion</Text>


        <TextInput
          placeholder='Direccion exacta'
          style={style.inputdescripcion}
          onChangeText={value => this.setState({ direccion: value })}
        />

        <Text>Tipo de Comida</Text>


        <TextInput
          placeholder='Tipo comida'
          style={style.input}
          onChangeText={value => this.setState({ tipoComida: value })}
        />

        <Text>Usuario</Text>


        <TextInput
          placeholder='usuario'
          style={style.input}
          onChangeText={value => this.setState({ user: value })}
        />

        <Text></Text>
        <Text></Text>

        <Button
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Modificar"
          onPress={() => this.modificarSoda()}
        />
        <Text></Text>
        <Button
          title="Crear Menú"
          onPress={() => { this.createMenu(), this.props.navigation.navigate('CreateMenu', { idMenu: this.state.idInserted }) }}
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
