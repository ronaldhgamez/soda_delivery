import React, { Component } from 'react'
import { View, Text, ScrollView, } from 'react-native'
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
            </View>
        )
    }
}