import React, { Component } from 'react'
import { View, Text, Button, TextInput, TouchableHighlight, Image, ScrollView, TouchableOpacity, DatePickerIOS } from 'react-native'
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
            idDistrito: 1,
            district: "",
            passwordConfirm: null,
            exactAddress: null,
            profileImage: 'https://image.flaticon.com/icons/png/512/892/892781.png',
            phoneNumber: null,
            owner: null,
            description: null,
            typeService: null,
            provinces: {},
            cantons: {},
            districts: {},
            selectedProvince: "San José",
            selectedCanton: "Central",
            selectedDistrict: "Carmen",
            selectedProvinceId: 1,
            selectedCantonId: 1,
            selectedDistrictId: 1
        }
    }
    componentDidMount() {
        this.getProvinces();
        this.onUpdateCantons(1);
        this.onUpdateDistrict(1, 1);
    }
    saveNewUser = () => {
        console.log(this.state.selectedPicker)
        if (this.state.selectedPicker == "usuario")
            this.saveUserUsuario()
        else if (this.state.selectedPicker == 'empresario')
            this.saveUserEmpresario()
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
    getProvinces = async () => {
        let provinces = await util.getProvinces();
        this.setState({ provinces: provinces })
    }
    onChangeProvince = (value, id) => {
        this.setState({ selectedProvince: value, selectedProvinceId: id })
        this.onUpdateCantons(id)
    }
    onChangeCanton = (value, id) => {
        this.setState({ selectedCanton: value, selectedCantonId: id })
        this.onUpdateDistrict(id)
    }
    onChangeDistrict = (value, id) => {
        this.setState({ selectedDistrict: value, selectedDistrictId: id })
    }
    onUpdateCantons = async (idProvince) => {
        let cantons = await util.getCantons(idProvince);
        this.setState({ cantons: cantons })
        this.onUpdateDistrict(1);
    }
    onUpdateDistrict = async (idCanton) => {
        let districts = await util.getDistricts(this.state.selectedProvinceId, idCanton);
        this.setState({ districts: districts })
    }
    saveUserUsuario = async () => {
        if (!this.state.name ||
            !this.state.lasName ||
            !this.state.userName ||
            !this.state.password ||
            !this.state.passwordConfirm ||
            !this.state.phoneNumber ||
            !this.state.exactAddress) {
            alert("Información incompleta")
        } else {
            if (this.state.password !== this.state.passwordConfirm) {
                alert("Las contraseñas no coinciden")
            } else {
                let data = {
                    name: this.state.name,
                    lastname: this.state.lasName,
                    pass: this.state.password,
                    exact_direction: this.state.exactAddress,
                    img_ulr: this.state.profileImage,
                    district: this.state.selectedDistrict,
                    canton: this.state.selectedCanton,
                    province: this.state.selectedProvince,
                    user: this.state.userName,
                    tel: this.state.phoneNumber
                }
                let res = await util.registerUser(data)
                if (res.msg) {
                    alert(res.info)
                    this.props.navigation.goBack()
                } else {
                    alert(res.info)
                }
            }
        }
    }
    saveUserEmpresario = async () => {
        if (!this.state.name ||
            !this.state.owner ||
            !this.state.description ||
            !this.state.password ||
            !this.state.passwordConfirm ||
            !this.state.phoneNumber ||
            !this.state.typeService ||
            !this.state.userName ||
            !this.state.exactAddress ||
            !this.state.profileImage) {
            alert("Información incompleta")
        } else {
            if (this.state.password !== this.state.passwordConfirm) {
                alert("Las contraseñas no coinciden")
            } else {
                let datos = {
                    owner: this.state.owner,
                    name: this.state.name,
                    pass: this.state.password,
                    type: this.state.typeService,
                    exact_direction: this.state.exactAddress,
                    description: this.state.description,
                    province: this.state.selectedProvince,
                    canton: this.state.selectedCanton,
                    district: this.state.selectedDistrict,
                    img_url: this.state.profileImage,
                    cafe_username: this.state.userName,
                    video_url: "",
                    tel: this.state.phoneNumber
                }
                let res = await util.registerSoda(datos)
                if (res.msg) {
                    alert(res.info)
                    this.props.navigation.goBack()
                } else {
                    alert(res.info)
                }
            }
        }
    }


    render() {
        let myProvinces = []
        let myCantons = []
        let myDistricts = []
        Object.entries(this.state.provinces).map(([key, value]) => {
            myProvinces.push(<Picker.Item label={value} id={key} value={value} key={key + value} />)
        })
        Object.entries(this.state.cantons).map(([key, value]) => {
            myCantons.push(<Picker.Item label={value} id={key} value={value} key={key + value} />)
        })
        Object.entries(this.state.districts).map(([key, value]) => {
            myDistricts.push(<Picker.Item label={value} id={key} value={value} key={key + value} />)
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
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Información General</Text>
                            </View>
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
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Dirección</Text>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedProvince}
                                    onValueChange={(value, id) => this.onChangeProvince(value, id + 1)}>
                                    {myProvinces}
                                </Picker>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedCanton}
                                    onValueChange={(value, id) => this.onChangeCanton(value, id + 1)}>
                                    {myCantons}
                                </Picker>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedDistrict}
                                    onValueChange={(value, id) => this.onChangeDistrict(value, id + 1)}>
                                    {myDistricts}
                                </Picker>
                            </View>
                            <Input
                                label={"Dirección exacta"}
                                onChangeText={value => this.setState({ exactAddress: value })}
                            />
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Información de la Cuenta</Text>
                            </View>
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
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Información General</Text>
                            </View>
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
                                label={"Número de teléfono"}
                                onChangeText={value => this.setState({ phoneNumber: value })}
                            />
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Dirección</Text>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedProvince}
                                    onValueChange={(value, id) => this.onChangeProvince(value, id + 1)}>
                                    {myProvinces}
                                </Picker>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedCanton}
                                    onValueChange={(value, id) => this.onChangeCanton(value, id + 1)}>
                                    {myCantons}
                                </Picker>
                            </View>
                            <View style={{ borderColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderRadius: 10, width: '94%', marginBottom: '4%', marginLeft: '3%' }}>
                                <Picker
                                    selectedValue={this.state.selectedDistrict}
                                    onValueChange={(value, id) => this.onChangeDistrict(value, id + 1)}>
                                    {myDistricts}
                                </Picker>
                            </View>
                            <Input
                                label={"Dirección exacta"}
                                onChangeText={value => this.setState({ exactAddress: value })}
                            />
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Información de la Cuenta</Text>
                            </View>
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
                            <View style={style.subtitleViews}>
                                <Text style={style.subtitleViewsText}>Multimedia</Text>
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