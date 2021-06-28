import { ExecutionEnvironment } from 'expo-constants'
import React from 'react'
import { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight, Button, Image } from 'react-native'
const util = require('../Utilities/UserHistory_helper')

import style from '../Styles/UserHistory_Style'


export default class UserHistoryDetail extends Component {
    constructor(props) {
        super(props),
            this.state = {
                id_order: this.props.route.params.id_order,
                orderData: {},
                cafeName: "",
                lstProducts: []
            }
    }
    componentDidMount() {
        this.getOrderData();
    }
    getProductData = async () => {
        let data = await util.getProductsOfOrders(this.state.id_order);
        //let products = []
        //data.map(async (doc) => {
        //let dat = await util.getProductData(doc.id_product);
        //    dat.amount = doc.amount
        //products.push(dat)
    }

    getOrderData = async () => {
        let data = await util.getOrderData(this.state.id_order)
        this.setState({ orderData: data.msg })
        this.getCafeData(data.msg.cafe_username)
        //this.getProductData();
    }
    getCafeData = async (cafe_username) => {
        let data = await util.getCafeData(cafe_username);
        this.setState({ cafeName: data.name })
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.upperContainer}>
                    <Text style={style.upperContainerText}>Detalles de la orden</Text>
                </View>
                <View style={style.subtitleContainer}>
                    <Text style={style.subtitleContainerText}>General</Text>
                </View>
                <View style={style.generalContainer}>
                    <Text style={style.dynamicText}>Estado del pedido: {this.state.orderData.state}</Text>
                    <Text style={style.dynamicText}>Fecha: {this.state.orderData.datetime}</Text>
                    <Text style={style.dynamicText}>Cliente: {this.state.orderData.user}</Text>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('SodasPerfilOriginal',{'user':this.state.orderData.user,'cafe_username':this.state.orderData.cafe_username})}>
                        <Text style={style.dynamicTextLink} >Lugar de compra: {this.state.cafeName}</Text>
                    </TouchableHighlight>
                    <Text style={style.dynamicText}>Costo total de la compra: {this.state.orderData.total}</Text>
                </View>
                <View style={style.subtitleContainer}>
                    <Text style={style.subtitleContainerText}>Productos</Text>
                </View>
                <ScrollView style={style.productsContainer}>
                    {this.state.lstProducts.map((product) => {
                        return (
                            <Text>{product}</Text>
                        )
                    })
                    }
                </ScrollView>
                <View style={style.buttonsContainer}>
                    <TouchableHighlight style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Text style={style.buttonsContainerText}>Salir</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}