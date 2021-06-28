import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, CheckBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { getOrders, changeOrderState, getNextState, getProductsOfMenu } from './Cafe_Consults';
import { MaterialDialog } from 'react-native-material-dialog';

export default function Orders(props) {

    const cafe_username = props.cafe_username;
    const [orders, setOrders] = useState([]);
    const [ordersChange, setOrdersChange] = useState(false);
    // Combobox options
    const [pendingCheckBox, setPending] = useState(false)
    const [preparingCheckBox, setPreparing] = useState(false)
    const [deliveredCheckBox, setDelivered] = useState(false)
    const [isLoading, setLoading] = useState(true);

    const [details_msg, setDetails] = useState('');
    const [visible, setVisible] = useState(false); // show message confirmation of order

    useEffect(() => {
        setOrdersChange(!ordersChange);
    }, [pendingCheckBox, deliveredCheckBox, preparingCheckBox]);

    useEffect(() => {
        setOrdersChange(false);
    }, [ordersChange]);

    useEffect(() => {
        (async () => {
            const data = await getOrders(cafe_username);
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
                icon = <Icon reverse size={23} color='orangered' name='timer' type='material-icons' />
                break
            case 'delivered':
                icon = <Icon reverse size={23} color='yellowgreen' name='check' type='material-icons' />
                break
            default:
                icon = <Icon reverse size={23} color='dodgerblue' name='chef-hat' type='material-community' />
                break
        }

        return <>
            <View key={index.toString()} style={product_card} >
                {icon}
                <View style={{ flexDirection: 'column', margin: '4%' }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>{"Cliente: " + item.user_data.name + " " + item.user_data.lastname}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{"Dirección: " + item.user_data.exact_direction}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{item.datetime}</Text>
                    <Text style={{ fontSize: 11, fontStyle: 'italic' }}>{"₡ " + item.total}</Text>

                    {/* VIEW BUTTONS */}
                    <View style={{ flexDirection: 'row' }}>
                        {/* EXCHANGE BUTTON */}
                        <TouchableOpacity style={{ flexDirection: 'column', marginLeft: '5%' }}>
                            <Icon raised size={20} name='exchange' type='font-awesome' color={getNextState(item.state).color}
                                onPress={async () => {
                                    item.state = ((state) => {
                                        if (state === 'delivered') return 'pending';
                                        return (state === 'pending') ? 'preparing' : 'delivered';
                                    })(item.state)
                                    await changeOrderState(item.id_order, item.state);
                                    setOrdersChange(!ordersChange);
                                }}
                            />
                            <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold' }}>{"Pasar a\n" + getNextState(item.state).state}</Text>
                        </TouchableOpacity>

                        {/* SEE DETAILS OF ORDER BUTTON */}
                        <TouchableOpacity style={{ flexDirection: 'column', marginLeft: '12%' }}>
                            <Icon raised size={20} name='list-1' type='fontisto' color="gray"
                                onPress={async () => {
                                    const data = await getProductsOfMenu(item.id_order);
                                    var ms = '';
                                    for (var obj of data) {
                                        ms += obj.product_data.name + "\n"
                                    }
                                    ms = ms + "---------\n"
                                    setDetails( ms);
                                    setVisible(true);
                                }}
                            />
                            <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold' }}>{"Detalles\npedidos"}</Text>
                        </TouchableOpacity>
                    </View>
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
        <Text style={styles.highlight_text}>{"Filtro de pedidos"}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            {render_combobox("Pendientes", pendingCheckBox, setPending)}
            {render_combobox("Preparando", preparingCheckBox, setPreparing)}
            {render_combobox("Entregados", deliveredCheckBox, setDelivered)}
        </View>

        {(isLoading) && (
            <View style={{ alignContent: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#12e4af" />
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
        {/* CONFIRMATION ORDER MESSAGE */}
        <MaterialDialog
            title="Lista de pedidos"
            visible={visible}
            cancelLabel='Cancelar'
            onOk={() => {
                setVisible(false);
            }}
            onCancel={() => setVisible(false)}>
            <Text>{details_msg}</Text>
        </MaterialDialog>
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
    highlight_text: {
        fontSize: 22, fontWeight: 'bold', alignSelf: 'center'
    }
});