import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, Image, TextInput, Button } from 'react-native'
import style from '../Styles/ProfileScreen_Style'
import { Text, Icon, SearchBar, Input } from 'react-native-elements';
const util = require('../Utilities/ProfileScreen')

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,// para editar el perfil del usuario
            myUserId: this.props.route.params.userId,
            name: null,
            lastName: null,
            exactAddress: null,
            idDistrito: null,
            user: null,
            password: null,
            phoneNumber: null,
            profileImageURL: 'https://image.flaticon.com/icons/png/512/892/892781.png',
            editName: null,
            editLastName: null,
            editExactAddress: null,
            editPassword: null,
            editPasswordConfirm: null,
            editPhoneNumber: null
        }
    }
    componentDidMount() {
        this.getUserInfo()
    }
    getUserInfo = async () => {
        console.log(this.state.myUserId)
        let data = await util.getUserInfo(this.state.myUserId)
        if (!data) {
            alert("Ha ocurrido un error cargar sus datos.")
            this.props.navigation.navigate("MainMenu")
        } else {
            this.setState({
                name: data.nombre,
                lastName: data.apellidos,
                exactAddress: data.direccionExacta,
                idDistrito: data.idDistrito,
                profileImageURL: data.imagenPerfil,
                user: data.usuario,
                password: data.contrasena,
            })
            let telefonoData = await util.getUserPhone(this.state.myUserId)
            if (!telefonoData) {
                alert("Ha ocurrido un error cargar sus datos.")
                this.props.navigation.navigate("MainMenu")
            } else {
                console.log(telefonoData)
                this.setState({ phoneNumber: telefonoData.telefono })
            }
        }
    }
    updateUserInfo = async () => {
        if (!this.state.editName ||
            !this.state.editLastName ||
            !this.state.editExactAddress ||
            !this.state.editPassword ||
            !this.state.editPasswordConfirm ||
            !this.state.editPhoneNumber) {
            alert("Información incompleta")
        }else{
            if(this.state.editPassword!==this.state.editPasswordConfirm || this.state.editPassword!==this.state.password){
                alert("Las contraseñas no coinciden")
            }else{
                data={
                    userId:this.state.myUserId,
                    nombre:this.state.editName,
                    apellidos:this.state.editLastName,
                    direccionExacta:this.state.editExactAddress,
                    telefono:this.state.editPhoneNumber,
                    contrasena:this.state.editPassword,
                    idDistrito:this.state.idDistrito,
                    imagenPerfil:this.state.profileImageURL,
                    usuario:this.state.user
                }
                let res=await util.updateUserInfo(data)
                if(res){
                    alert("Información actualizada con éxito")
                    this.props.navigation.navigate("MainMenu")
                }else{
                    alert("Error, los datos no fueron actualizados")
                }
            }
        }
    }
    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.upperView}>
                    <View style={style.upperView_Container1}>
                        <View style={style.imageView}>
                            <TouchableHighlight style={style.imageContainer}>
                                <Image
                                    style={style.image}
                                    source={{ uri: this.state.profileImageURL }}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={style.nameView}>
                            <Text style={style.nameText}>{this.state.name}</Text>
                            <Text style={style.nameText}>{this.state.lastName}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={style.contentView}>
                    <Input
                        label={"Nombre"}
                        disabled={!this.state.editing}
                        placeholder={this.state.name}
                        onChangeText={value => this.setState({ editName: value })}
                    />
                    <Input
                        label={"Apellidos"}
                        disabled={!this.state.editing}
                        placeholder={this.state.lastName}
                        onChangeText={value => this.setState({ editLastName: value })}
                    />
                    <Input
                        label={"Dirección exacta"}
                        disabled={!this.state.editing}
                        placeholder={this.state.exactAddress}
                        onChangeText={value => this.setState({ editExactAddress: value })}
                    />
                    <Input
                        label={"Teléfono"}
                        disabled={!this.state.editing}
                        placeholder={this.state.phoneNumber}
                        onChangeText={value => this.setState({ editPhoneNumber: value })}
                    />
                    <Input
                        label={"Nombre de usuario"}
                        disabled={true}
                        placeholder={this.state.user}
                    />
                    <Input
                        secureTextEntry={true}
                        label={"Contraseña actual"}
                        disabled={!this.state.editing}
                        placeholder={"******"}
                    />
                    {this.state.editing &&
                        <View style={style.changePasswordInputs}>
                            <Input
                                secureTextEntry={true}
                                label={"Nueva contraseña"}
                                disabled={!this.state.editing}
                                onChangeText={value => this.setState({ editPassword: value })}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Confirme contraseña"}
                                disabled={!this.state.editing}
                                onChangeText={value => this.setState({ editPasswordConfirm: value })}
                            />
                        </View>
                    }
                </ScrollView>
                <View style={style.editingButton}>
                    <View style={style.editingButtonLeft}>
                        <TouchableHighlight style={{ width: '90%' }}>
                            <Button color='red' title={this.state.editing ? "Cancelar" : "Editar perfil"} onPress={() => this.setState({ editing: !this.state.editing })}></Button>
                        </TouchableHighlight>
                    </View>
                    {this.state.editing &&
                        <View style={style.editingButtonRight}>
                            <TouchableHighlight style={{ width: '90%' }}>
                                <Button color='red' title="Guardar" onPress={this.updateUserInfo}></Button>
                            </TouchableHighlight>
                        </View>
                    }

                </View>
                <View style={style.bottonView}>
                    <Icon
                        containerStyle={style.bottomIcon}
                        name='home'
                        size={50}
                        color='#bbbbbbe0'
                        onPress={() => this.props.navigation.navigate('MainMenu')}
                    />
                    <Icon
                        containerStyle={style.bottomIcon}
                        name='settings'
                        size={45}
                        color='#bbbbbbe0'

                        onPress={() => alert("Hacer ventana de settings")}
                    />
                </View>
            </View>
        )
    }
}