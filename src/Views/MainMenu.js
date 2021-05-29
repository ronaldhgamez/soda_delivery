import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import Ionicons from '@expo/vector-icons'
import style from '../Styles/MainMenu_Style'
import SettingScreen from './SettingScreen'
import ProfileScreen from './ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
const helper = require('../Utilities/SodasHelper')


const Tab = createBottomTabNavigator();

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sodas: []
        }
    }


    getSodas = async () => {
        let sodas = await helper.getSodas()
        for (var key in sodas) {
            this.setState({ sodas: [...this.state.sodas, sodas[key]] })
        }
    }


    render() {
        return (
            <View style={style.MainMenu}>
                <Button
                    title='ver sodas estado'
                    onPress={()=>console.log(this.state.sodas)}
                />
                <Button
                    title='cargar sodas'
                    onPress={this.getSodas}
                />
                <Text > Menu Principal donde va a trabajar Jose :P </Text>
                <Button
                    title="Crear Menú"
                    onPress={() => this.props.navigation.navigate('CreateMenu')}
                />
            </View>
        )
    }
}
