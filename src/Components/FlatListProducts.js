import React from 'react';
import { Text, TouchableOpacity, Touchable, View, FlatList } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import styles from '../Styles/Sodas_Perfil_Original_Styles'


function _renderProduct({ item, index }) {

    const { textPlateDescription, textPrice, plate_card, plate_image, textPlateName, cardDescription } = styles;
    return (
        <View key={item.id} style={plate_card}>
            <Image style={plate_image} source={{ uri: item.image }} />
            <Text style={textPlateName}>{item.name} </Text>
            <Text style={textPlateDescription}>{item.description} </Text>
            <Text style={textPrice}>{"₡ " + item.price}</Text>
        </View>
    );
}

function _renderItem({ item, index }) {

    const products = item.products; /* list of plates of menu */
    const { menu, menu_container, textMenuName } = styles;

    return (
        /* Menus */
        <View key={item.id} style={menu_container} >
            <Text style={textMenuName}>
                <Icon type='material-icon' name='menu-book'></Icon>
                {" " + item.title}
            </Text>

            {/* list of plates */}
            <FlatList
                style={menu}
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderProduct}
            />
            <View style={{ alignSelf: 'center' }}>
                <Icon
                    size={34}
                    name='angle-double-up'
                    type='font-awesome'
                    color='black'
                />
            </View>
        </View >
    );
}

export {
    _renderItem,
    _renderProduct
}