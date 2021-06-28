import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { getMenus, getProductsMenu, updateMenu, addAttributesToObjects } from './Cafe_Consults';

export default function Menu(props) {

    const [cafe_username, setCafe] = useState(props.cafe_username);
    const [menus, setMenus] = useState([]);
    const [menusChange, setMenusChange] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            var data = await getMenus(cafe_username);
            data = addAttributesToObjects(data);
            setMenus(data);
            setMenusChange(!menusChange);
            setLoading(!isLoading);

        })()
    }, []); // Runs once when component mounts for the first time

    const _renderMenus = ({ item, index }) => {
        const { product_card, description_menu } = styles;
        //var icon_name = (item.display) ? 'angle-double-up' : 'angle-double-down'
        return <>
            <View key={index.toString()} style={product_card} >
                <View style={{ flexDirection: 'column', margin: '4%' }}>

                    <Text style={description_menu}>{(index + 1) + ') ' + item.description}</Text>

                    {/* VIEW BUTTONS */}
                    <View style={{ flexDirection: 'row' }}>

                        {/* EDIT BUTTON */}
                        <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
                            <Icon size={35} name='edit' type='font-awesome'
                                onPress={() => {
                                    item.editing = !item.editing;
                                    setMenusChange(!menusChange);
                                }}
                            />
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>{"Editar"}</Text>
                        </View>

                        {/* SEE ALL PRODUCTS BUTTON */}
                        <View style={{ flexDirection: 'column', marginLeft: '15%' }}>
                            <Icon size={35} name='list-alt' type='font-awesome'
                                onPress={() => {

                                }}
                            />
                            <Text style={{ fontSize: 10, textAlign: 'center' }}>{"Productos"}</Text>
                        </View>
                    </View>

                    {(item.editing) && (
                        <View style={{ flexDirection: 'column', margin: '4%', alignItems: 'center' }}>
                            <TextInput
                                defaultValue={item.description}
                                color='black'
                                style={styles.input}
                                onChangeText={text => item.new_value = text}
                            />

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ flexDirection: 'column' }}>
                                    <Icon size={22} name='angle-double-up' type='font-awesome' raised
                                        onPress={() => {
                                            item.editing = !item.editing;
                                            item.new_value = item.description;
                                            setMenusChange(!menusChange);
                                        }}
                                    />
                                    <Text style={{ fontSize: 10, textAlign: 'center' }}>{"Cancelar"}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <Icon raised size={22} name='save' type='font-awesome'
                                        onPress={async () => {
                                            item.description = item.new_value;
                                            await updateMenu(item.id_menu, item.new_value);
                                            // reset values
                                            item.editing = !item.editing;
                                            //item.display = !item.display;
                                            item.new_value = item.description;
                                            setMenusChange(!menusChange);
                                        }}
                                    />
                                    <Text style={{ fontSize: 10, textAlign: 'center' }}>{"Guardar"}</Text>
                                </View>

                            </View>
                        </View>
                    )}

                    {/* {(item.display) && (
                        <>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.description}</Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.cafe_username}</Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.id_menu}</Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.display + ""}</Text>

                        </>
                    )} */}
                    {/* <Icon raised size={25} name={icon_name} type='font-awesome' color='#f8eb34'
                        onPress={() => {
                            item.display = !item.display;
                            setMenusChange(!menusChange);
                        }}
                    /> */}

                </View>
            </View>

        </>
    }

    return <>
        <Text style={{ paddingTop: StatusBar.currentHeight }}></Text>
        <Text style={styles.highlight_text}>{"Mis Menus"}</Text>

        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray' }}
            onPress={() => { }}
        >
            <Icon raised size={20} name='plus' type='font-awesome' color='#12e4af' />
            <Text style={{ fontSize: 15 }}>{"Agregar un nuevo menu"}</Text>
        </TouchableOpacity>

        {(isLoading) && (
            <View style={{ alignContent: 'center', backgroundColor: 'white' }}>
                <ActivityIndicator size="large" color="#12e4af" />
            </View>
        )}

        {(menus.length == 0 && !isLoading) && (
            <View style={styles.product_card} >
                <Icon name='playlist-remove' type='material-community' size={70}></Icon>
                <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center', marginLeft: '10%' }}>Aún no tienes menus</Text>
            </View>
        )}

        <FlatList
            style={{ backgroundColor: 'white' }}
            data={menus}
            keyExtractor={(item, index) => index.toString()}
            renderItem={_renderMenus}
        />
    </>;
}


const styles = StyleSheet.create({
    product_card: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: '1%',
        width: '98%',
        borderColor: 'azure',
        elevation: 2,
        backgroundColor: "#f8eb34"
    },
    description_menu: {
        fontSize: 17, fontWeight: 'bold', marginBottom: '3%', fontStyle: 'italic'
    },
    highlight_text: {
        fontSize: 24, fontWeight: 'bold', alignSelf: 'center'
    },
    input: {
        width: 300,
        borderWidth: 0.5,
        lineHeight: 20,
        textAlign: 'center'
    }
});
