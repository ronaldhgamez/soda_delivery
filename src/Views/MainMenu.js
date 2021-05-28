import React, { Component } from 'react'
import { View, Text,Button } from 'react-native'
import style from '../Styles/MainMenu_Style'

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={style.MainMenu}>
                <Text > Menu Principal donde va a trabajar Jose :P </Text>
                <Button
                    title="Crear Menú"
                    onPress={() => this.props.navigation.navigate('CreateMenu')}
                />
                <Text> </Text>
                <Text> </Text>

                <Button
                    title="Sodas"
                    onPress={() => this.props.navigation.navigate('ModifyPSoda')}
                />
            </View>
            
        )
    }
}
