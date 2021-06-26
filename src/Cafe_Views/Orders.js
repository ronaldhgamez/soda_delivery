import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, Button, CheckBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { getOrders, changeOrderState } from './Cafe_Consults';

export default function Orders() {

    const [cafe, setCafe] = useState('usuariocafe2');
    const [orders, setOrders] = useState([]);
    const [ordersChange, setOrdersChange] = useState(false);
    // Combobox options
    const [pendingCheckBox, setPending] = useState(false)
    const [preparingCheckBox, setPreparing] = useState(false)
    const [deliveredCheckBox, setDelivered] = useState(false)

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setOrdersChange(!ordersChange);
    }, [pendingCheckBox, deliveredCheckBox, preparingCheckBox]);

    useEffect(() => {
        setOrdersChange(false);
    }, [ordersChange]);

    useEffect(() => {
        (async () => {
            const data = await getOrders(cafe);
            setOrders(data);
            setLoading(!isLoading);
            setOrdersChange(!ordersChange);
        })()

    }, []); // Runs once when component mounts for the first time

    const _renderOrders = ({ item, index }) => {
        // filters
        if (pendingCheckBox || preparingCheckBox || deliveredCheckBox) {
            if (item.state === 'pending' && !pendingCheckBox)
                return;
            if (item.state === 'preparing' && !preparingCheckBox)
                return;
            if (item.state === 'delivered' && !deliveredCheckBox)
                return;
        }

        const { product_card } = styles;
        var icon;
        switch (item.state) {
            case 'pending':
                icon = <Icon reverse raised size={25} color='red' name='timer' type='material-icons' />
                break
            case 'delivered':
                icon = <Icon reverse raised size={25} color='yellowgreen' name='check' type='material-icons' />
                break
            default:
                icon = <Icon reverse raised size={25} color='dodgerblue' name='chef-hat' type='material-community' />
                break
        }

        return <>
            <View key={index.toString()} style={product_card} >
                {icon}
                <View style={{ flexDirection: 'column', margin: '4%' }}>

                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{"cliente: " + item.client}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{"$ " + item.total}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{item.datetime}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{item.state}</Text>

                    <Button
                        onPress={async () => {
                            item.state = ((state) => {
                                if (state === 'delivered') return 'pending';
                                return (state === 'pending') ? 'preparing' : 'delivered';
                            })(item.state)
                            await changeOrderState(item.id, item.state);
                            setOrdersChange(!ordersChange);
                        }}
                        title="Cambiar estado"
                        color="rgba(45, 107, 224, 0.9)"
                    />
                </View>

            </View>
        </>
    }


    const render_combobox = (text, toggleCheckBox, setToggleCheckBox) => {
        return <>
            <CheckBox
                value={toggleCheckBox}
                onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
                key={text}
            />
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginRight: '2%' }}>{text}</Text>
        </>
    }

    return <>
        <Text style={{ paddingTop: StatusBar.currentHeight }}></Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>{"Filtro de pedidos"}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            {render_combobox("Pendientes", pendingCheckBox, setPending)}
            {render_combobox("Preparando", preparingCheckBox, setPreparing)}
            {render_combobox("Entregados", deliveredCheckBox, setDelivered)}
        </View>

        {(isLoading) && (
            <View style={{ alignContent: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="deeppink" />
            </View>
        )}

        {(orders.length == 0 && !isLoading) && (
            <View style={styles.product_card} >
                <Icon name='playlist-remove' type='material-community' size={70}></Icon>
                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginLeft: '10%' }}>Aún no hay pedidos!</Text>
            </View>
        )}
        <FlatList
            style={{ backgroundColor: 'white' }}
            data={orders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderOrders}
        />
    </>
}

const styles = StyleSheet.create({
    product_card: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: '1%',
        width: '100%',
        backgroundColor: 'snow',
        borderColor: 'azure',
        elevation: 2,
    },
});