import { get } from 'lodash'
import React from 'react'
import { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight, Button } from 'react-native'
import style from '../Styles/UserHistory_Style'

const util = require('../Utilities/UserHistory_helper')

export default class UserHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.route.params.userName,
            orders: []
        }
    }
    componentDidMount() {
        this.getUserOrders();
    }
    getUserOrders = async () => {
        let myOrders = await util.getUserOrders(this.state.userName)
        this.setState({ orders: myOrders })
    }
    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.upperContainer}>
                    <Text style={style.upperContainerText}>Historial de compra</Text>
                </View>
                <ScrollView style={style.contentContainer}>
                    {
                        this.state.orders.map((order, index) => {
                            return (
                                <View style={style.dynamicContainer} key={index}>
                                    <Text style={style.dynamicText}>Fecha: {order.datetime}</Text>
                                    <Text style={style.dynamicText}>Precio total: {order.total}</Text>
                                    <Text style={style.dynamicContainerDetailsText} onPress={() => this.props.navigation.navigate('UserHistoryDetail',{'id_order':order.id_order})}>Detalles {'>>>'}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View style={style.buttonsContainer}>
                    <TouchableHighlight style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Text style={style.buttonsContainerText}>Regresar</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}