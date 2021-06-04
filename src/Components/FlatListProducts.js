import React from 'react';
import { Text, TouchableOpacity, Touchable, View, FlatList } from 'react-native';
import { Image, Icon } from 'react-native-elements'
import styles from '../Styles/Sodas_Perfil_Original_Styles'


function _renderProduct({ item, index }) {

    const { menu_container, textPrice, plate_card, plate_image, textPlateName, cardDescription } = styles;
    return (
        <View key={item.id} style={plate_card}>
            <Image style={plate_image} source={{ uri: item.image }} />
            <Text style={textPlateName}>{item.name} </Text>
            <Text style={textPrice}>{"₡ " + item.price}</Text>
        </View>
    );
}

function _renderItem({ item, index }) {

    const products = item.products; /* list of plates of menu */
    const { menu_container, profile_card, textMenuName } = styles;

    return (
        /* Menus */
        <View key={item.id} style={profile_card} >
            <Text style={textMenuName}>{item.title} </Text>

            {/* list of plates */}
            <FlatList
                style={menu_container}
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderProduct}
            />
            {/* Button to display list of plates */}
            <TouchableOpacity onPress={() => console.log(item.title)}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <Icon
                        size={35}
                        name='angle-double-down'
                        type='font-awesome'
                        color='#517fa4'
                    />
                </View>
            </TouchableOpacity>

        </View>
    );
}

export {
    _renderItem,
    _renderProduct
}