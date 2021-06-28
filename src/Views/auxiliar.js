import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar, Image, Icon } from 'react-native-elements'


export default class auxiliar extends Component {

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
                    title="Perfil Soda"
                    onPress={() => this.props.navigation.navigate('SodasPerfilOriginal', { "user": "ronaldhg", "cafe_username": "sodamartha" })}
                />

                <Button
                    title="Sodas administración"
                    onPress={() => this.props.navigation.navigate('CafesButtonNavigation', { "cafe_username": "sodamartha", "navigation":  this.props.navigation })}
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
