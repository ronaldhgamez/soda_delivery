import React, { Component, useState } from 'react';
import { View, Picker, TextInput } from 'react-native';
import style from '../Styles/ModifySoda_Style';
import { Text, Icon, Button } from 'react-native-elements';
import { addMenu } from "../Utilities/CreateMenuCon";
import { getInformation, modifySodas } from '../Utilities/SodasHelper';

class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      exactAddress: '',
      names: '',
      owner: '',
      type: '',
      cafe_username: 'sodamartha',
      spinner: false,
      value: 0,
      PickerSelectedVal: '',
      setMsj: ''
    };
  }

  async componentDidMount() {
    console.log("getting data");
    const data = await getInformation(this.state.cafe_username);
    console.log("-------");
    console.log(data);
  }

  //----------------------------------------------------------------
  //----------               ACCIONES                 --------------
  //----------------------------------------------------------------

  modify = async () => {
    const {description, exact_direction, names, owner, type, cafe_username } = this.state;
    console.log(description + exact_direction + names + owner)
    const updated = await modifySodas(description, exact_direction,names,owner, type, cafe_username);
    console.log(updated);
  }

  delete = async()=>{
    console.log("borrando");
  }

  //----------------------------------------------------------------
  //----------------------------------------------------------------

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
          onChangeText={value => this.setState({ names: value })}
        />

        <Text>Dueño</Text>


        <TextInput
          placeholder='Propietario'
          style={style.input}
          onChangeText={value => this.setState({ owner: value })}
        />

        <Text>Descripcion</Text>


        <TextInput
          placeholder='Descripcion'
          style={style.inputdescripcion}
          onChangeText={value => this.setState({ description: value })}
        />

        <Text>Direccion</Text>


        <TextInput
          placeholder='Direccion exacta'
          style={style.inputdescripcion}
          onChangeText={value => this.setState({ exact_direction: value })}
        />

        <Text>Tipo de Comida</Text>


        <TextInput
          placeholder='Tipo comida'
          style={style.input}
          onChangeText={value => this.setState({ type: value })}
        />

        <Text></Text>
        <Text></Text>

        <Button
          icon={{ name: "arrow-right", size: 15, color: "white" }}
          title="Modificar"
          onPress={() => this.modify()}
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
