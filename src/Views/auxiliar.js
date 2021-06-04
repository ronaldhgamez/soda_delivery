import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'


export default class auxiliar extends Component {

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', flex: 1 }}>
                <Text style={{color:'red',fontWeight:'bold'}}>
                    Ventana provisional 
                </Text>
                <Button
                    title="MainMenu"
                    onPress={() => this.props.navigation.navigate('MainMenu')}
                />
                <Button
                    title="Crear Menú"
                    onPress={() => this.props.navigation.navigate('CreateMenu')}
                />
                <Button
                    title="Sodas"
                    onPress={() => this.props.navigation.navigate('SodasPerfilOriginal')}
                />
            </View>
        )
    }


}