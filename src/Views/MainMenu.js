import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons'
import style from '../Styles/MainMenu_Style'
import { Text, Icon, Button, Input, SearchBar } from 'react-native-elements';
const helper = require('../Utilities/SodasHelper')


//const Tab = createBottomTabNavigator();

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sodas: [],
            search: '',
            filtersVisible: false
        }
    }

    onSearchUpdate = (search) => {
        this.setState({ search: search })
    }

    onFiltersVisibleStatus = () => {
        this.setState({ filtersVisible: !this.state.filtersVisible })
    }

    getSodas = async () => {
        let sodas = await helper.getSodas()
        let lst = []
        for (var key in sodas) {
            lst.push(sodas[key])
        }
        this.setState({ sodas: lst })
    }

    componentDidMount() {
        this.getSodas()
    }

    dinamycSoda = (soda, indice) => {
        return (
            <TouchableOpacity onPress={() => alert("Hacer ventana perfil de soda")}>
                <View style={style.dinamycMainContainer} >
                    <View style={style.dinamycLeftSide}>
                        <TouchableHighlight style={style.dinamycPintureContainer} >
                            <Image
                                style={style.dinamycPicture}
                                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={style.dinamycRightSide}>
                        <Text style={style.dinamycData}>{soda.name}</Text>
                        <Text style={style.dinamycData}>{soda.type}</Text>
                        <Text style={style.dinamycData}>{soda.exactAddress}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={style.MainMenu}>
                <View style={style.searchBar}>
                    <SearchBar
                        placeholder="Type here for search"
                        onChangeText={this.onSearchUpdate}
                        value={this.state.search}
                        lightTheme={true}
                        containerStyle={style.searchBarContainer}
                        inputContainerStyle={style.searBarInput}
                        inputStyle={{ color: 'white' }}
                        clearIcon={true}
                    />
                    <Icon
                        containerStyle={style.filterIconContainer}
                        name='reorder'
                        color='#bbbbbbe0'
                        size={50}
                        onPress={this.onFiltersVisibleStatus}
                    />
                </View>
                {this.state.filtersVisible &&
                    <View style={style.filtersMainContainer}>
                        <Text>Aqui van los filtros</Text>
                    </View>
                }
                <ScrollView style={style.content}>
                    {this.state.sodas.map((sod, i) => {
                        return this.dinamycSoda(sod, i)
                    })
                    }
                </ScrollView>
                <View style={style.bottonView}>
                    <Icon
                        containerStyle={style.bottomIcon}
                        name='person'
                        size={50}
                        color='#bbbbbbe0'
                        onPress={() => alert("Hacer ventana perfil de usuario")}
                    />
                    <Icon
                        containerStyle={style.bottomIcon}
                        name='settings'
                        size={45}
                        color='#bbbbbbe0'
                        onPress={() => alert("Hacer ventana de settings")}
                    />
                </View>
            </View>
        )
    }
}
