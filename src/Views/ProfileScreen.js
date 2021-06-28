import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, Image, TextInput, Button } from 'react-native'
import style from '../Styles/ProfileScreen_Style'
import { Text, Icon, SearchBar, Input } from 'react-native-elements';
const util = require('../Utilities/ProfileScreen')
import { fileToBlob, loadImageFromGallery } from "../Utilities/helper";
import { storage } from '../Utilities/firebase';
import { Picker } from '@react-native-community/picker';
import { getProvinces, getCantons, getDistricts } from '../Utilities/LoginAndRegister'

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,// para editar el perfil del usuario
            myUserName: this.props.route.params.userName,
            name: null,
            lastName: null,
            exactAddress: null,
            district: null,
            user: null,
            password: null,
            phoneNumber: null,
            profileImageURL: 'https://image.flaticon.com/icons/png/512/892/892781.png',
            editName: null,
            editLastName: null,
            editExactAddress: null,
            editPassword: null,
            editPasswordConfirm: null,
            editPhoneNumber: null,
            province: null,
            canton: null,
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
        this.getUserInfo()
        this.getProvinces()
        this.onUpdateCantons(1);
        this.onUpdateDistrict(1, 1);
    }
    getUserInfo = async () => {
        let data = await util.getUserInfo(this.state.myUserName)
        if (!data) {
            alert("Ha ocurrido un error cargar sus datos.")
            this.props.navigation.navigate("MainMenu")
        } else {
            this.setState({
                name: data.name,
                editName: data.name,
                lastName: data.lastname,
                editLastName: data.lastname,
                exactAddress: data.exact_direction,
                editExactAddress: data.exact_direction,
                province: data.province,
                editProvince: data.province,
                canton: data.canton,
                editCanton: data.canton,
                district: data.district,
                profileImageURL: data.img_ulr,
                user: data.user,
                password: data.pass,
                editPassword: data.pass,
                editPasswordConfirm: data.pass,
                phoneNumber: data.tel,
                editPhoneNumber: data.tel
            })
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
        } else {
            if (this.state.editPassword !== this.state.editPasswordConfirm) {
                alert("Las contraseñas no coinciden")
            } else {
                data = {
                    name: this.state.editName,
                    lastname: this.state.editLastName,
                    exact_direction: this.state.editExactAddress,
                    tel: this.state.editPhoneNumber,
                    pass: this.state.editPassword,
                    district: this.state.selectedDistrict,
                    img_ulr: this.state.profileImageURL,
                    user: this.state.user,
                    canton: this.state.selectedCanton,
                    province: this.state.selectedProvince
                }
                let res = await util.updateUser(data)
                if (res) {
                    alert("Información actualizada con éxito")
                    this.props.navigation.navigate("MainMenu")
                } else {
                    alert("Error, los datos no fueron actualizados")
                }
            }
        }
    }
    changePicture = async (index) => {
        const result = await loadImageFromGallery([1, 1])
        let imgName = result.image.substring(result.image.lastIndexOf('/') + 1);
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
                        this.setState({ profileImageURL: url })
                    })
            })

    }
    //Functions for handling address-related procedures
    getProvinces = async () => {
        let provinces = await getProvinces();
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
        let cantons = await getCantons(idProvince);
        this.setState({ cantons: cantons })
        this.onUpdateDistrict(1);
    }
    onUpdateDistrict = async (idCanton) => {
        let districts = await getDistricts(this.state.selectedProvinceId, idCanton);
        this.setState({ districts: districts })
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
                <View style={style.upperView}>
                    <View style={style.upperView_Container1}>
                        <View style={style.imageView}>
                            <TouchableHighlight style={style.imageContainer} onPress={this.changePicture} disabled={!this.state.editing}>
                                <Image
                                    style={style.image}
                                    source={{ uri: this.state.profileImageURL }}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={style.nameView}>
                            <Text style={style.nameText}>Perfil de Usuario</Text>
                        </View>
                    </View>
                </View>
                <View style={{width:'100%'}}>
                    <TouchableHighlight style={style.userHistoryContainer} onPress={()=>this.props.navigation.navigate('UserHistory',{'userName':this.state.myUserName})}>
                        <Text style={style.userHistoryText}> Ver historial de compras {'>>>'}</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView style={style.contentView}>
                    <View style={style.subtitleViews}>
                        <Text style={style.subtitleViewsText}>Información General</Text>
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Nombre:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.name}
                            editable={this.state.editing}
                            onChangeText={(value) => this.setState({ editName: value })}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Apellidos:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.lastName}
                            editable={this.state.editing}
                            onChangeText={(value) => this.setState({ editLastName: value })}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Teléfono:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.phoneNumber}
                            editable={this.state.editing}
                            onChangeText={(value) => this.setState({ editPhoneNumber: value })}
                        />
                    </View>
                    <View style={style.subtitleViews}>
                        <Text style={style.subtitleViewsText}>Dirección</Text>
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Provincia:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.province}
                            editable={false}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Cantón:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.canton}
                            editable={false}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Distrito:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.district}
                            editable={false}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Dirección exacta:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.exactAddress}
                            editable={this.state.editing}
                            onChangeText={(value) => this.setState({ editExactAddress: value })}
                        />
                    </View>
                    {
                        this.state.editing &&
                        <View style={style.addressEditingContainer}>
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
                        </View>
                    }
                    <View style={style.subtitleViews}>
                        <Text style={style.subtitleViewsText}>Información de la cuenta</Text>
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}>Nombre de usuario:</Text>
                        <TextInput
                            textAlign='center'
                            defaultValue={this.state.user}
                            editable={false}
                        />
                    </View>
                    <View style={style.textInput}>
                        <Text style={style.textInputLabel}> Contraseña actual:</Text>
                        <TextInput
                            secureTextEntry={true}
                            textAlign='center'
                            defaultValue={this.state.password}
                            editable={false}
                        />
                    </View>
                    {this.state.editing &&
                        <View style={style.changePasswordInputs}>
                            <View style={style.textInput}>
                                <Text style={style.textInputLabel}> Nueva contraseña:</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    textAlign='center'
                                    defaultValue={this.state.password}
                                    editable={this.state.editing}
                                    onChangeText={(value) => this.setState({ editPassword: value })}
                                />
                            </View>
                            <View style={style.textInput}>
                                <Text style={style.textInputLabel}> Confirmar contraseña:</Text>
                                <TextInput
                                    secureTextEntry={true}
                                    textAlign='center'
                                    defaultValue={this.state.password}
                                    editable={this.state.editing}
                                    onChangeText={(value) => this.setState({ editPasswordConfirm: value })}
                                />
                            </View>
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