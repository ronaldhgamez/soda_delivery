import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableHighlight, Image, ScrollView, TouchableOpacity } from 'react-native'
import style from '../Styles/Register_Style'
import { Picker } from '@react-native-community/picker';
import { Input } from 'react-native-elements'
const util = require('../Utilities/LoginAndRegister')
import { fileToBlob, loadImageFromGallery } from "../Utilities/helper";
import { storage } from '../Utilities/firebase';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPicker: null,
            name: null,
            lasName: null,
            userName: null,
            password: null,
            idCafe: null,
            idDistrito: 1,
            district: "",
            passwordConfirm: null,
            exactAddress: null,
            profileImage: 'https://image.flaticon.com/icons/png/512/892/892781.png',
            phoneNumber: null,
            userId: null,
            owner: null,
            description: null,
            typeService: null,
            provinces: [],
            cantons: [],
            districts: [],
            selectedProvince: "",
            selectedCanton: "",
            selectedDistrict: ""
        }
    }
    componentDidMount(){
        this.getProvinces();
    }
    saveNewUser = () => {
        console.log(this.state.selectedPicker)
        if (this.state.selectedPicker == "usuario")
            this.saveUserUsuario()
        //else if (this.state.selectedPicker == 'empresario')
        //this.saveUserEmpresario
    }
    getProvinces = async () => {
        let provinces = await util.getProvinces();
        let allProvinces = []
        for (key in provinces) {
            allProvinces.push(provinces[key]);
        }
        this.setState({ provinces: allProvinces })
    }

    changePicture = async (index) => {
        //Open the gallery and choose the image or video
        const result = await loadImageFromGallery([1, 1])

        //Get the name of the file
        let imgName = result.image.substring(result.image.lastIndexOf('/') + 1);

        //The file is convert to blob
        let a = await fileToBlob(result.image);
        //The blob is upload to the storage
        const uploadTask = storage.ref(`avatars/${imgName}`).put(a);
        uploadTask.on("state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("avatars")
                    .child(`${imgName}`)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ profileImage: url })
                    })
            })
    }
    onChangeProvince = (value) => {
        this.setState({selectedProvince:value})
    }
    onChangeCanton = (value) => {

    }
    onChangeDistrict = (value) => {

    }
    onUpdateCantons = (idProvince) => {

    }
    onUpdateDistrict = (idCanton) => {

    }
    saveUserUsuario = async () => {

        if (!this.state.name ||
            !this.state.lasName ||
            !this.state.userName ||
            !this.state.password ||
            !this.state.passwordConfirm ||
            !this.state.phoneNumber ||
            !this.state.userId ||
            !this.state.exactAddress) {
            alert("Información incompleta")
        } else {
            if (this.state.password !== this.state.passwordConfirm) {
                alert("Las contraseñas no coinciden")
            } else {
                data = {
                    nombre: this.state.name,
                    apellidos: this.state.lasName,
                    contrasena: this.state.password,
                    direccionExacta: this.state.exactAddress,
                    idCliente: parseInt(this.state.userId),
                    imagenPerfil: "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267_960_720.jpg",
                    idDistrito: parseInt(this.state.idDistrito),
                    usuario: this.state.userName,
                    telefono: this.state.phoneNumber
                }
                let res = await util.registerUser(data)
                if (res) {
                    alert("Registrado correctamente")
                    this.props.navigation.goBack()
                } else {
                    alert("Error al registrar sus datos")
                }
            }
        }
    }
    saveUserEmpresario = async () => {
        if (!this.state.name ||
            !this.state.idCafe ||
            !this.state.owner ||
            !this.state.description ||
            !this.state.password ||
            !this.state.passwordConfirm ||
            !this.state.phoneNumber ||
            !this.state.typeService ||
            !this.state.userName ||
            !this.state.exactAddress) {
            alert("Información incompleta")
        } else {
            if (this.state.password !== this.state.passwordConfirm) {
                alert("Las contraseñas no coinciden")
            } else {
                data = {
                    idCafe: parseInt(this.state.idCafe),
                    idDistrito: parseInt(this.state.idDistrito),
                    owner: this.state.owner,
                    name: this.state.name,
                    password: this.state.password,
                    type: this.state.typeService,
                    exactAddress: this.state.exactAddress,
                    description: this.state.description,
                    image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
                    user: this.state.userName,
                    video: ""
                }
            }
        }
    }
    render() {
        let myProvinces = []
        this.state.provinces.map((province, index) => {
            myProvinces.push(<Picker.Item label={province} value={province} key={index} />)
        })
        return (
            <View style={style.mainContainer}>
                <View style={style.upperContainer}>
                    <View style={style.upperContainerLeft}>
                        <TouchableHighlight style={{ width: '100%', height: '100%' }} onPress={this.changePicture}>
                            <Image
                                style={style.imageStyle}
                                source={{ uri: this.state.profileImage }}
                            />

                        </TouchableHighlight>
                    </View>
                    <View style={style.upperContainerRight}>
                        <View style={{ borderWidth: 1, borderRadius: 15, width: '90%', marginLeft: '5%' }}>
                            <Picker
                                selectedValue={this.state.selectedPicker}
                                style={{ height: '50%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ selectedPicker: itemValue })
                                }>
                                <Picker.Item label="Tipo de cuenta" value="placeHolder" />
                                <Picker.Item label="Usuario" value="usuario" />
                                <Picker.Item label="Empresario" value="empresario" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <ScrollView style={style.contentContainer}>
                    {
                        this.state.selectedPicker == "usuario" &&
                        <View style={style.usuarioMainContainer}>
                            <Input
                                label={"Número de identificación"}
                                onChangeText={value => this.setState({ userId: value })}
                            />
                            <Input
                                label={"Nombre"}
                                onChangeText={value => this.setState({ name: value })}
                            />
                            <Input
                                label={"Apellidos"}
                                onChangeText={value => this.setState({ lasName: value })}
                            />
                            <Input
                                label={"Número de teléfono"}
                                onChangeText={value => this.setState({ phoneNumber: value })}
                            />
                            <Picker
                                selectedValue={this.state.selectedProvince}
                                onValueChange={(value) => this.onChangeProvince(value)}>
                                {myProvinces}
                            </Picker>
                            <Input
                                label={"Dirección exacta"}
                                onChangeText={value => this.setState({ exactAddress: value })}
                            />
                            <Input
                                label={"Nombre de usuario"}
                                placeholder={"Necesario para iniciar sesión"}
                                onChangeText={value => this.setState({ userName: value })}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Contraseña"}
                                placeholder={"Necesario para iniciar sesión"}
                                onChangeText={value => this.setState({ password: value })}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Confirmar contraseña"}
                                onChangeText={value => this.setState({ passwordConfirm: value })}
                            />

                        </View>
                    }
                    {
                        this.state.selectedPicker == "empresario" &&

                        <View style={style.empresarioMainContainer}>
                            <Input
                                label={"Número de identificación"}
                                onChangeText={value => this.setState({ idCafe: value })}
                                placeholder={"Valores numéricos"}
                            />
                            <Input
                                label={"Nombre del local"}
                                onChangeText={value => this.setState({ name: value })}
                            />
                            <Input
                                label={"Nombre completo de propietario(a)"}
                                onChangeText={value => this.setState({ owner: value })}
                            />
                            <Input
                                label={"Tipo de servicio"}
                                placeholder={"comida rápida,típica,asiática,..."}
                                onChangeText={value => this.setState({ typeService: value })}
                            />
                            <Input
                                label={"Descripción breve"}
                                onChangeText={value => this.setState({ description: value })}
                            />
                            <Input
                                label={"Dirección exacta"}
                                onChangeText={value => this.setState({ exactAddress: value })}
                            />
                            <Input
                                label={"Nombre de usuario"}
                                onChangeText={value => this.setState({ userName: value })}
                                placeholder={"Necesario para iniciar sesión"}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Contraseña"}
                                placeholder={"Necesario para iniciar sesión"}
                                onChangeText={value => this.setState({ password: value })}
                            />
                            <Input
                                secureTextEntry={true}
                                label={"Confirmar contraseña"}
                                onChangeText={value => this.setState({ passwordConfirm: value })}
                            />
                            <View style={style.mediaContainer}>
                                <View style={style.mediaContainerLeft}>
                                    <TouchableHighlight style={style.mediaImageLeft}>
                                        <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={{ uri: "https://image.flaticon.com/icons/png/512/685/685685.png" }} />
                                    </TouchableHighlight>
                                </View>
                                <View style={style.mediaContainerRight}>
                                    <TouchableHighlight style={style.mediaImageRight}>
                                        <Image style={{ resizeMode: 'contain', width: '100%', height: '100%' }} source={{ uri: "https://image.flaticon.com/icons/png/512/1294/1294320.png" }} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={style.bottomContainer}>
                    <View style={style.bottomContainerLeft}>
                        <TouchableHighlight style={{ width: '85%' }}>
                            <Button
                                title="Regresar"
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={style.bottomContainerRight}>
                        <TouchableHighlight style={{ width: '85%' }}>
                            <Button
                                title="Registrarse"
                                onPress={() => this.saveNewUser()}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}