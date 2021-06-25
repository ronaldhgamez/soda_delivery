import React, {Component, useState} from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, Button,Alert, Platform} from 'react-native'
import style from '../Styles/CreateMenu_Style'

import { addProduct} from '../Utilities/CreateMenuCon'
import {fileToBlob, loadImageFromGallery} from "../Utilities/helper";
import {storage} from '../Utilities/firebase';

export default class CreateMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_fields:[],
            idMenu : this.props.route.params.item,
            photoURL : 'https://firebasestorage.googleapis.com/v0/b/sodas-db-nodejs.appspot.com/o/avatars%2Fimg.png?alt=media&token=d556ce19-d6cf-4e2d-bafd-c36db1872cf5'
        }
    }

    //FALTA QUE SE MANDE EL ID DEL MENU BIEN
    save = async () => {
        console.log("------------------------")
        console.log(this.state.idMenu)
        await this.state.product_fields.map(n => addProduct({idMenu:"EJNE6r7UdlBBSInOyqSy", imgUrl: n.meta_foto,name: n.meta_name, price: n.meta_price}));
    }

    addProductField = () =>{
        this.setState({
            product_fields:[...this.state.product_fields,{meta_foto: 'value',meta_name:'value', meta_price:'value'}]
        })
    }
    OnProductInputNameHandler = (value,index) => {
        this.state.product_fields[index].meta_name = value;
        this.setState({product_fields:this.state.product_fields});
    }
    OnProductInputPriceHandler= (value,index) =>{
        this.state.product_fields[index].meta_price = value;
        this.setState({product_fields:this.state.product_fields});
    }
    deleteDynamicField = (index) =>{
        this.state.product_fields.splice(index,1);
        this.setState({product_fields:this.state.product_fields});
    }
    //Choose the image and save in the firebase's storage
    changePhoto = async (index) =>{
        //Open the gallery and choose the image or video
        const result  = await loadImageFromGallery([1,1])

        //Get the name of the file
        let imgName = result.image.substring(result.image.lastIndexOf('/')+1);

        //The file is convert to blob
        let a = await fileToBlob(result.image);

        //The blob is upload to the storage
        const uploadTask = storage.ref(`avatars/${imgName}`).put(a);
        uploadTask.on("state_changed",
            snapshot => {},
            error => {
            console.log(error);
            },
            () =>{
            storage
                .ref("avatars")
                .child(`${imgName}`)
                .getDownloadURL()
                .then(url =>{
                    this.state.product_fields[index].meta_foto = url;
                    this.setState({product_fields:this.state.product_fields});
                })
        })
    }

    //Function for control the photo in each space in the list
    chooseURL = (index) =>{
        if ( this.state.product_fields[index].meta_foto !== "value"){
            return this.state.product_fields[index].meta_foto;
        }else {
            return this.state.photoURL;
        }
    }

    render() {
        return (
            <View style={style.container}>
                <Text style = {style.lblTittle}> Menú </Text>
                {
                    this.state.product_fields.map((productInput,k) =>{
                        return(
                            <View key = {k} style = {style.inputsContainer}>
                                <TouchableOpacity onPress = {() => this.changePhoto(k)} >
                                    <Text style = {[style.addBtnTextImg]}>
                                        {<Image
                                            style={style.iconHistorialImg}
                                            source={{
                                                uri: `${this.chooseURL(k)}`,
                                            }}/>}
                                    </Text>
                                </TouchableOpacity>
                                <View style = {[style.inputContainer]}>
                                    <TextInput
                                        style = {style.input}
                                        value = {productInput.key}
                                        onChangeText={name =>{this.OnProductInputNameHandler(name,k)}}
                                        placeholder={'Nombre del Producto'}/>
                                </View>
                                <View style = {[style.inputContainer]}>
                                    <TextInput
                                        style={style.input}
                                        onChangeText={price => {this.OnProductInputPriceHandler(price,k)}}
                                        placeholder={'Precio'}/>
                                </View>
                                <TouchableOpacity onPress = {() => this.deleteDynamicField(k)} >
                                    <Text style = {[style.addBtnText]}>
                                        {<Image
                                            style={style.iconHistorial}
                                            source={require('../../assets/eliminar.png')}/>}</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    })
                }
                <TouchableOpacity
                    style={style.addBtn}
                    onPress={()=>{this.addProductField()}}>
                    <Text style = {style.addBtnT}> Agregar Producto</Text>
                </TouchableOpacity>

                <Button
                    title="Guardar"
                    onPress={() => this.save()}
                />
            </View>
        )
    }
}
