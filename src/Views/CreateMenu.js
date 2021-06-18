import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, Button} from 'react-native'
import style from '../Styles/CreateMenu_Style'
import helper from '../Utilities/helper'
import { addProduct} from '../Utilities/CreateMenuCon'
import {loadImageFromGallery} from "../Utilities/helper";

export default class CreateMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_fields:[],
            idMenu : this.props.route.params.idMenu
        }
    }

    save = async () => {
        await this.state.product_fields.map(n => addProduct({idMenu: "ccnySGMUiQPDEQlGBbAJ", name: n.meta_name, price: n.meta_price}));
    }

    addProductField = () =>{
        this.setState({
            product_fields:[...this.state.product_fields,{meta_name:'value', meta_price:'value'}]
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
    changePhoto = async () =>{
        let result = await loadImageFromGallery([1,1])
        console.log(result);
    }
    render() {
        return (
            <View style={style.container}>
                <Text style = {style.lblTittle}> Menú </Text>

                {
                    this.state.product_fields.map((productInput,k) =>{
                        return(
                            <View key = {k} style = {style.inputsContainer}>
                                <TouchableOpacity onPress = {() => this.changePhoto()} >
                                    <Text style = {[style.addBtnTextImg]}>
                                        {<Image
                                            style={style.iconHistorialImg}
                                            source={require('../../assets/img.png')}/>}</Text>
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
