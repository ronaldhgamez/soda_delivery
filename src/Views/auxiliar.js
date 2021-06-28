import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar, Image, Icon } from 'react-native-elements'
import { addMenu } from '../Utilities/CreateMenuCon'

export default class auxiliar extends Component {

    //Create the menu
    createMenu = async () => {
        let idInserted = await addMenu({ cafe_username: "sodamartha", descripcion: "HELLO" });
        this.props.navigation.navigate('CreateMenu', { item: idInserted })
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
                    onPress={() => { this.createMenu() }}
                />
                <Button
                    title="Sodas"
                    onPress={() => this.props.navigation.navigate('SodasPerfilOriginal')}
                />

                <Button
                    title="Sodas administración"
                    onPress={() => this.props.navigation.navigate('CafesButtonNavigation', { "cafe_username": "sodamartha" })}
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
