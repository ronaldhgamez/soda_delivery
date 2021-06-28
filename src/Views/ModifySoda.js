import React, { Component, useState } from 'react';
import { View, Picker, TextInput } from 'react-native';
import style from '../Styles/ModifySoda_Style';
import { Text, Icon, Button } from 'react-native-elements';
import { addMenu } from "../Utilities/CreateMenuCon";
import { getInformation, modifySodas,deleteCafe, deleteCafes } from '../Utilities/SodasHelper';

//import { useTranslation } from 'react-i18next';
//import i18next from 'i18next';
//import * as serviceWorker from './serviceWorker';
/*
function handleClick(lang) {
  t = useTranslation();
  i18next.changeLanguage(lang)
}
*/
class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cafe_username:this.props.cafe_username,
      description: '',
      exact_direction: '',
      names: '',
      owner: '',
      type: '',
      spinner: false,
      value: 0,
      PickerSelectedVal: '',
      setMsj: ''
    };
  }

  async componentDidMount() {
    const data = await getInformation(this.state.cafe_username);
    this.setState({
      "owner": data.owner,
      "names": data.name,
      "description": data.description,
      "type": data.type,
      "exact_direction": data.exact_direction
    });
  }

  //----------------------------------------------------------------
  //----------               ACCIONES                 --------------
  //----------------------------------------------------------------

  modify = async () => {
    const { description, exact_direction, names, owner, type, cafe_username } = this.state;
    const updated = await modifySodas(description, exact_direction, names, owner, type, cafe_username);
    console.log("updated: " + updated);
  }

  delete = async () => {
    const { cafe_username } = this.state;
    const del = await deleteCafes(cafe_username);
    console.log("deleted: "+del);
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
          value={this.state.names}
          onChangeText={value => this.setState({ names: value })}
        />

        <Text>Dueño</Text>


        <TextInput
          placeholder='Propietario'
          style={style.input}
          value={this.state.owner}
          onChangeText={value => this.setState({ owner: value })}
        />

        <Text>Descripcion</Text>


        <TextInput
          placeholder='Descripcion'
          style={style.inputdescripcion}
          value={this.state.description}
          onChangeText={value => this.setState({ description: value })}
        />

        <Text>Direccion</Text>


        <TextInput
          placeholder='Direccion exacta'
          style={style.inputdescripcion}
          value={this.state.exact_direction}
          onChangeText={value => this.setState({ exact_direction: value })}
        />

        <Text>Tipo de Comida</Text>


        <TextInput
          placeholder='Tipo comida'
          style={style.input}
          value={this.state.type}
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
          onPress={() => this.delete()}
        />

        <View style={{ alignSelf: 'flex-end', marginRight: '23%', marginTop: '-15%' }}>
          <Icon
            raised
            size={15} name='language'
            type='font-awesome'
            color='blue'
            onPress={() => handleClick('en')} >

          </Icon>

        </View>

      </View>
    );
  }
}

export default ModifySoda;
