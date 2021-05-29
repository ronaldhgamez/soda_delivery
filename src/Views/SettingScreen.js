import React, { Component } from 'react'
import { View, Text } from 'react-native'
import style from '../Styles/SettingScreen_Style'

export default class SettingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <Text>Setting Screen!</Text>
            </View>

        )
    }

}