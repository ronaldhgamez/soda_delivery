import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, TouchableOpacity } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import { getInformation } from '../Utilities/SodasHelper';
import { getMenus, orderFoodFirebase } from '../Cafe_Views/Cafe_Consults';
import { MaterialDialog } from 'react-native-material-dialog';
import { Alert } from 'react-native';

export default function SodasPerfilOriginal(props) {

    const user = props.route.params.user;
    const [cafe_username, setCafe] = useState(props.route.params.cafe_username);
    const [cafe_data, setCafeData] = useState({});
    const [menus, setMenus] = useState([]);
    const [menusChange, setMenusChange] = useState(false);
    const [display_options, setDisplay] = useState(false);

    const [order_list, setOrderList] = useState([]);
    const [total_price, setTotal] = useState(0.0);
    const [details_msg, setDetails] = useState('');
    const [visible, setVisible] = useState(false); // show message confirmation of order

    useEffect(() => {
        (async () => {
            setCafeData(await getInformation(cafe_username));
            setMenus(await getMenus(cafe_username));
        })()
    }, [])

    useEffect(() => {
        setMenusChange(false);
    }, [menusChange]);

    const render_info = (iconName, iconType, description) => {
        return <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon reverse size={6} name={iconName} type={iconType} color='#8c7f7fd7' />
                <Text style={{ fontSize: 11, marginRight: '1%' }}>{description}</Text>
            </View>
        </>
    }

    const _renderProduct = ({ item, index }) => {

        const { textPrice, plate_card, plate_image, textPlateName, input } = styles;
        var icon_color = (item.selected) ? 'lightgreen' : 'gray';

        return <>
            <View key={item.id_product} style={plate_card}>
                <Image style={plate_image} source={{ uri: item.img_url }} />
                <Text style={textPlateName}>{item.name} </Text>
                <Text style={textPrice}>{"₡ " + item.price}</Text>

                {(!item.isBuying) &&
                    < View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <Button
                            title="   -   "
                            color="#841584"
                            onPress={() => {
                                item.amount = (item.amount === 1) ? 1 : item.amount - 1;
                                setMenusChange(!menusChange);
                            }}
                        />
                        <TextInput
                            editable={false}
                            style={input}
                            value={item.amount + ""}
                        />
                        <Button
                            title="   +   "
                            color="#841584"
                            onPress={() => {
                                item.amount = (item.amount === 20) ? 20 : item.amount + 1;
                                setMenusChange(!menusChange);
                            }}
                        />
                        <Icon reverse size={18} name='shopping-basket-add' type='fontisto' color={icon_color}
                            onPress={() => {
                                item.selected = !item.selected;
                                setMenusChange(!menusChange);
                            }}
                        />
                    </View>
                }
            </View>
        </>
    }

    const _renderMenu = ({ item, index }) => {
        var icon_name = (item.display) ? 'angle-double-up' : 'angle-double-down'
        return <>
            {/* Yellow Menus */}
            <TouchableOpacity
                key={item.id} style={{ backgroundColor: '#f8eb34', borderRadius: 15, margin: 5 }}
                onPress={() => {
                    item.display = !item.display;
                    setMenusChange(!menusChange);
                }}
            >
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    <Icon type='material-icon' name='menu-book' size={20}></Icon>
                    <Text style={{ fontSize: 18, fontWeight: '500', margin: '1%' }}>{item.description}</Text>
                </View>

                {/* list of plates */}
                {(item.display) && (
                    <FlatList
                        style={{ borderRadius: 5 }}
                        data={item.product_list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={_renderProduct}
                    />
                )}

                <View style={{ alignSelf: 'flex-end' }}>
                    <Icon raised reverse size={20} name={icon_name} type='font-awesome' color='#8c7f7fd7' />
                </View>
            </TouchableOpacity >
        </>
    }

    const _renderIcon = (icon_name, icon_type, text, color, funct) => {
        return <>
            <TouchableOpacity style={{ flexDirection: 'column', marginLeft: '5%' }}>
                <Icon raised size={17} color={color} name={icon_name} type={icon_type} onPress={() => funct()}></Icon>
                <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold' }}>{text}</Text>
            </TouchableOpacity>
        </>
    }

    const getOrderData = async () => {
        var order_product = []; // [ {id_product, amount}, {...} ]
        var total = 0.0; // total to pay
        var msg = '';
        for (var m of menus) {
            var products = m.product_list;
            for (let p of products) {
                if (p.selected) {
                    const subtotal = p.price * p.amount;
                    total += subtotal;
                    var details = { "id_product": p.id_product, "amount": p.amount }
                    order_product.push(details);
                    msg = msg.concat(p.name);
                    msg = msg.concat("\ncantidad: " + p.amount);
                    msg = msg.concat("\nsubtotal: " + subtotal);
                    msg = msg.concat("\n------------------\n");
                }
            }
        }
        if (order_product.length > 0) {
            msg = msg.concat("\nmonto total: " + total + "\n");
            setDetails(msg);
            setOrderList(order_product);
            setTotal(total);
            setVisible(true); // show message of confirmation of order
        }
    }

    const soda = cafe_data;
    return <>
        <Text style={{ marginTop: '1%' }}></Text>

        {/* Soda biografy */}
        <View style={{ marginBottom: 1, backgroundColor: 'white', elevation: 3, marginHorizontal: 5 }}>

            {/* display soda's description and image */}
            <Image style={{ width: '100%', height: 160, resizeMode: 'cover' }} source={{ uri: soda.img_url }} />
            <Text style={{ fontSize: 19, marginLeft: '2%', fontWeight: 'bold' }}>{soda.name + ' (' + soda.type + ')'}</Text>

            {/* display soda's exact address */}
            {render_info('google-maps', 'material-community', soda.exact_direction)}
            {/* display soda's owner */}
            {render_info('person', 'fontisto', 'Propietario: ' + soda.owner)}
            {/* display soda's telephone number */}
            {render_info('telephone', 'foundation', soda.tel)}

            <View style={{ alignSelf: 'flex-end', marginRight: '2%', marginTop: '-14%' }}>
                <Icon raised size={18} name='options' type='simple-line-icon' onPress={() => { setDisplay(!display_options) }}></Icon>
            </View>
            {(display_options) && (
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: '2%' }}>
                    {_renderIcon('star', 'font-awesome', 'Calificar', '#f8eb34', () => {
                        console.log("\n" + details_msg);
                    })}
                    {_renderIcon('shopping-cart', 'font-awesome', 'Hacer pedido', '#2be412', getOrderData)}
                </View>
            )}
        </View>

        {/* Displays list of menus */}
        <FlatList
            data={menus}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderMenu}
            onScroll={() => setDisplay(false)}
        />

        {/* CONFIRMATION ORDER MESSAGE */}
        <MaterialDialog
            title="Lista de pedidos"
            visible={visible}
            okLabel='Confirmar pedido'
            cancelLabel='Cancelar'
            onOk={async () => {
                await orderFoodFirebase(user, cafe_username, total_price, order_list);
                setVisible(false);
                Alert.alert("Se ha realizado el pedido!");
            }}
            onCancel={() => setVisible(false)}>
            <Text>{details_msg}</Text>
        </MaterialDialog>
    </>
}

/* <ActivityIndicator animating={false} size="large" color="#00ff00" /> */

const styles = StyleSheet.create({
    textPrice: {
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    },
    plate_card: {
        alignSelf: 'center',
        marginVertical: '1.5%',
        width: '95%',
        backgroundColor: '#8c7f7fd7', // snow
        elevation: 3,
    },
    plate_image: {
        width: '100%',
        height: 175,
        resizeMode: 'cover'
    },
    textPlateName: {
        fontSize: 15,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    input: { height: 30, margin: 12, borderWidth: 1, color: 'white', textAlign: 'center' }
})