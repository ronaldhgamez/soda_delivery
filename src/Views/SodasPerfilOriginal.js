import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Avatar, Image, Icon } from 'react-native-elements'
import styles from '../Styles/Sodas_Perfil_Original_Styles'
import { _renderItem, _renderProduct } from '../Components/FlatListProducts';
import ModifySoda from './ModifySoda';
import 'react-native-gesture-handler';

export default class SodaPerfilOriginal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: 'ronaldhg',
            soda_data: {
                "type": "Classic",
                "user": "usuariocafe1",
                "address": "Santa Clara",
                "description": "Restaurante Happy Land",
                "owner": "Ronald Herrera Gámez",
                "idCafe": "123423",
                "password": "123",
                "exactAddress": "Frente al ITCR, Santa Clara, Florencia, San Carlos, Alajuela, Costa Rica, Santa Clara, Costa Rica",
                "name": "Restaurante Happy Land",
                "image": 'https://ep01.epimg.net/elviajero/imagenes/2019/02/11/actualidad/1549902929_910841_1549903405_noticia_normal.jpg',
                "tel": "2463-1243"
            },

            menu: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'Entradas',
                    products: [
                        {
                            idProduct: "sasdfasf",
                            name: "Coctel Ceviche",
                            description: "Ceviche rico y sabroso",
                            price: 4500.40,
                            image: "https://t1.rg.ltmcdn.com/es/images/7/4/1/ceviche_peruano_18147_600_square.jpg"
                        },
                        {
                            idProduct: "sasdfassdf",
                            name: "Coctel Ceviche",
                            description: "Ceviche rico y sabroso",
                            price: 4500.00,
                            image: "https://t1.rg.ltmcdn.com/es/images/7/4/1/ceviche_peruano_18147_600_square.jpg"
                        }
                    ]
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Comidas',
                    products: [
                        {
                            idProduct: "sasdfasasdf",
                            name: "Sopa mariscos",
                            description: "Fondo de mariscos aromatizado a la mar, arroz suelto y crocante pub",
                            price: 5500.12,
                            image: "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/receta-de-sopa-de-mariscos-tradicional.jpg"
                        },
                        {
                            idProduct: "sasdfa32df",
                            name: "Sopa mariscos",
                            description: "Fondo de mariscos aromatizado a la mar, arroz suelto y crocante pub",
                            price: 5500.90,
                            image: "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/receta-de-sopa-de-mariscos-tradicional.jpg"
                        }
                    ]
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Menu de la casa',
                    products: [
                        {
                            idProduct: "sasdfasasdf",
                            name: "Sopa mariscos",
                            description: "Fondo de mariscos aromatizado a la mar, arroz suelto y crocante pub",
                            price: 5500.33,
                            image: "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/receta-de-sopa-de-mariscos-tradicional.jpg"
                        }
                    ]
                },
            ],
        }
    }

    render_info(iconName, iconType, description, text_style) {
        return (
            <Text style={text_style}>
                <Icon
                    size={11}
                    name={iconName}
                    type={iconType}
                    color='rgba(45, 107, 224, 0.9)'
                    onPress={() => { console.log("description: " + description) }}
                />
                {'\t' + description}
            </Text>
        );
    }

    render() {
        let { menu_container, profile_card, cardImage, cardDescription, textSodaName } = styles;
        const soda = this.state.soda_data;
        return (
            <>
                <Text style={{ marginTop: '1%' }}></Text>

                {/* Soda biografy */}
                <View style={profile_card}>

                    {/* display soda's description and image */}
                    <Image style={cardImage} source={{ uri: soda.image }} />
                    <Text style={textSodaName}>{soda.description}</Text>
                    {
                        /* display soda's exact address */
                        this.render_info('google-maps', 'material-community', soda.exactAddress, cardDescription)
                    }
                    {
                        /* display soda's owner */
                        this.render_info('person', 'fontisto', 'Propietario: ' + soda.owner, cardDescription)
                    }
                    {
                        /* display soda's telephone number */
                        this.render_info('telephone', 'foundation', soda.tel, cardDescription)
                    }
                    <View style={{ alignSelf: 'flex-end', marginRight: '2%', marginTop: '-14%' }}>
                        <Icon
                            raised
                            size={26} name='edit'
                            type='font-awesome'
                            color='rgba(45, 107, 224, 0.9)'
                            onPress={() => this.props.navigation.navigate('ModifySoda')}>
                        </Icon>
                    </View>
                </View>

                {/* Displays list of menus */}
                <FlatList
                    data={this.state.menu}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                    //onScrollEndDrag={()=>{console.log("fin")}}
                />
                {/* <ActivityIndicator animating={false} size="large" color="#00ff00" /> */}
            </>
        );
    }
}