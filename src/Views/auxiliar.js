import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar, Image, Icon } from 'react-native-elements'
import { addMenu } from '../Utilities/CreateMenuCon'

export default class auxiliar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idInserted : ''
        }
    }
    //Create the menu
    createMenu = async () => {
        let idInserted =await addMenu({cafe_username:  "sodamartha", descripcion: "HELLO"});
        this.setState({idInserted:idInserted});
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', flex: 1 }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    Ventana provisional
                </Text>
                <Button
                    title="MainMenu"
                    onPress={() => this.props.navigation.navigate('MainMenu')}
                />
                 <Button
                    title="Crear Menú"
                    onPress={() =>{this.createMenu(), this.props.navigation.navigate('CreateMenu', {item:this.state.idInserted })}}
                />
                <Button
                    title="Sodas"
                    onPress={() => this.props.navigation.navigate('SodasPerfilOriginal')}
                />

                <Button
                    title="Pantalla de sodas"
                    onPress={() => this.props.navigation.navigate('Orders')}
                />

                <Button
                    title="Pantalla Menus"
                    onPress={() => this.props.navigation.navigate('Menu', { "user": "ronaldhg" })}
                />

                <View>
                    <Icon
                        raised
                        size={15} name='language'
                        type='font-awesome'
                        color='blue'>
                    </Icon>

                </View>
            </View>
        )
    }


}
