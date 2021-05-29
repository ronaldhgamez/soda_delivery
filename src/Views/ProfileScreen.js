import React, { Component } from 'react'
import { View, Text } from 'react-native'
import style from '../Styles/ProfileScreen_Style'

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <Text>Profile Screen!</Text>
            </View>
        )
    }
}