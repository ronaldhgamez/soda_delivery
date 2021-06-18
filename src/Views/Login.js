import React, { Component } from 'react'
import { View, Text, TextInput, ImageBackground, Button, TouchableOpacity } from 'react-native'
import style from '../Styles/Login_Style'
const backGround = require('../../assets/Login_BackGround.png')
const util = require('../Utilities/LoginAndRegister')


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
            userId: null
        }
    }

    onCheckLogin = async () => {
        if (this.state.userName && this.state.password) {
            let response = await util.login(this.state.userName, this.state.password)
            if (!response) {
                alert("El usuario no existe o la contraseña es incorrecta")
            } else {
                this.setState({ userId: response })
                this.props.navigation.navigate("MainMenu", { userId: response })
            }
        }
    }

    render() {
        return (
            <ImageBackground source={backGround} style={{ flex: 1, justifyContent: 'center', resizeMode: 'cover' }}>
                <View style={style.mainContainer}>
                    <View style={style.secondaryContainer}>
                        <View style={style.upperContainer}>
                            <View style={style.inputStyle}>
                                <TextInput
                                    style={{ textAlign: 'center' }}
                                    placeholder={"Nombre de usuario"}
                                    onChangeText={value => this.setState({ userName: value })}
                                />
                            </View>
                            <View style={style.inputStyle}>
                                <TextInput
                                    secureTextEntry={true}
                                    style={{ textAlign: 'center' }}
                                    placeholder={"Contraseña"}
                                    onChangeText={value => this.setState({ password: value })}
                                />
                            </View>
                        </View>
                        <View style={style.BottomContainer}>
                            <TouchableOpacity>
                                <Button
                                    title="Iniciar sesión"
                                    onPress={this.onCheckLogin}
                                />
                            </TouchableOpacity>
                            <Text style={style.textStyle} onPress={() => this.props.navigation.navigate("Register")}>Registrarse?</Text>
                        </View>
                    </View>
                    <Button
                    title="ventana provisional"
                    onPress={()=>this.props.navigation.navigate("Auxiliar")}
                    />
                </View>
            </ImageBackground>
        )
    }
}