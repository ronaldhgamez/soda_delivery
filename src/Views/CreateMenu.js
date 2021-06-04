import React, { Component } from 'react'
import {View, Text, TouchableOpacity, TextInput, Image, Button} from 'react-native'
import style from '../Styles/CreateMenu_Style'

import {addProduct} from '../Utilities/CreateMenuCon'

export default class CreateMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product_fields:[]
        }
    }

    save = async () => {
        console.log(this.props.route.params.id+ "******************************");
        //await this.state.product_fields.map(n => addProduct(this.props.route.params.id,  n.meta_name, n.meta_price))
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

    render() {
        return (
            <View style={style.container}>
                <Text style = {style.lblTittle}> Menú </Text>
                {
                    this.state.product_fields.map((productInput, k) =>{
                        {
                            return(
                                <View style = {style.inputsContainer}>
                                    <View style = {[style.inputContainer]}>
                                        <TextInput
                                            style={style.input}
                                            onChange={name =>{this.OnProductInputNameHandler(name,k)}}
                                            placeholder={'Nombre del Producto'}/>
                                    </View>
                                    <View style = {[style.inputContainer]}>
                                        <TextInput
                                            style={style.input}
                                            onChange={price => {this.OnProductInputPriceHandler(price,k)}}
                                            placeholder={'Precio'}/>
                                    </View>
                                    <TouchableOpacity onPress = {() => this.deleteDynamicField(k)} >
                                        <Text style = {style.addBtnText}>
                                            {<Image
                                            style={style.iconHistorial}
                                            source={require('/soda_delivery-main/assets/eliminar.png')}/>}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })
                }

                <TouchableOpacity
                    style={style.addBtn}
                    onPress={()=>{this.addProductField()}}>
                    <Text style = {style.addBtnText}> Agregar Producto</Text>
                </TouchableOpacity>

                <Button
                    title="Guardar"
                    onPress={() => this.save()}
                />
            </View>
        )
    }
}
