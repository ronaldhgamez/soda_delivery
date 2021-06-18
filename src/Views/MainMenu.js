import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons'
import style from '../Styles/MainMenu_Style'
import { Text, Icon, SearchBar } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
const helper = require('../Utilities/SodasHelper')
import { Picker, Item } from '@react-native-community/picker'

//const Tab = createBottomTabNavigator();

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sodas: [],
            sodasBackUp: [],
            search: '',
            filtersVisible: false,
            foodTypes: [],
            allAddresses: [],
            selectedFoodFilter: "Todo",
            selectedAddressFilter: "Todo"
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
        let sodaLst = []
        let foodLst = []
        let addressLst = []
        for (var key in sodas) {
            sodaLst.push(sodas[key])
            if (!foodLst.includes(sodas[key].type)) {
                foodLst.push(sodas[key].type)
            }
            if (!addressLst.includes(sodas[key].exactAddress)) {
                addressLst.push(sodas[key].exactAddress)
            }
        }
        this.setState({ sodas: sodaLst, allAddresses: addressLst, foodTypes: foodLst, sodasBackUp: sodaLst })
    }
    componentDidMount() {
        this.getSodas()
    }

    dinamycSoda = (soda, indice) => {
        return (
            <TouchableOpacity key={indice.toString()} onPress={() => alert("Hacer ventana perfil de soda")}>
                <View style={style.dinamycMainContainer} >
                    <View style={style.dinamycLeftSide}>
                        <TouchableHighlight style={style.dinamycPintureContainer} >
                            <Image
                                style={style.dinamycPicture}
                                source={{ uri: 'https://images.vexels.com/media/users/3/181353/isolated/preview/1f0da6687abc94f096fef731e614292f-ilustraci-oacute-n-de-color-de-comida-de-m-eacute-xico-by-vexels.png' }}
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

    onFoodFilterUpdate = (value) => {
        this.setState({ selectedFoodFilter: value })
        setTimeout(() => {
            this.onFilterResults()
        }, 500)
    }
    onAddressFilterUpdate = (value) => {
        this.setState({ selectedAddressFilter: value })
        setTimeout(() => {
            this.onFilterResults()
        }, 500);

    }
    onFilterResults = () => {

        if (this.state.selectedAddressFilter == "Todo" && this.state.selectedFoodFilter == "Todo") {
            this.setState({ sodas: this.state.sodasBackUp })
        } else {
            let filterResult = []
            if (this.state.selectedAddressFilter !== "Todo" && this.state.selectedFoodFilter !== "Todo") {
                this.state.sodasBackUp.map((soda) => {
                    if (soda.exactAddress == this.state.selectedAddressFilter || soda.type == this.state.selectedFoodFilter) {
                        filterResult.push(soda)
                    }
                })
            } else if (this.state.selectedAddressFilter !== "Todo") {
                this.state.sodasBackUp.map((soda) => {
                    if (soda.exactAddress == this.state.selectedAddressFilter) {
                        filterResult.push(soda)
                    }
                })
            } else if (this.state.selectedFoodFilter !== "Todo") {
                this.state.sodasBackUp.map((soda) => {
                    if (soda.type == this.state.selectedFoodFilter) {
                        filterResult.push(soda)
                    }
                })
            }
            this.setState({ sodas: filterResult })
        }
    }
    a = () => {
        alert("botón para hacer pruebas ")
    }
    render() {
        let myFoodTypes = []
        myFoodTypes.push(<Picker.Item label={"Todo"} value={"Todo"} key={"Todo"} />)
        this.state.foodTypes.map((food, index) => {
            myFoodTypes.push(<Picker.Item label={food} value={food} key={index} />)
        })
        let myAddresses = []
        myAddresses.push(<Picker.Item label={"Todo"} value={"Todo"} key={"Todo"} />)
        this.state.allAddresses.map((address, index) => {

            myAddresses.push(<Picker.Item label={address} value={address} key={index} />)
        })
        return (
            <View style={style.MainMenu}>
                <View style={style.searchBar}>
                    <SearchBar
                        placeholder="Type here to search"
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
                        color='rgba(3, 31, 79,0.9)'
                        size={50}
                        onPress={this.onFiltersVisibleStatus}
                    />
                </View>
                {this.state.filtersVisible &&
                    <View style={style.filtersMainContainer}>
                        <View>
                            <Text style={style.filtersText}>Filtro por especialidad</Text>
                            <View style={{ borderColor: 'rgba(45, 107, 224, 0.5)', borderWidth: 2, borderRadius: 30 }}>
                                <Picker
                                    selectedValue={this.state.selectedFoodFilter}
                                    onValueChange={(value) => this.onFoodFilterUpdate(value)} >
                                    {myFoodTypes}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={style.filtersText}>Filtro por ubicación</Text>
                            <View style={{ borderColor: 'rgba(45, 107, 224, 0.5)', borderWidth: 2, borderRadius: 30 }}>
                                <Picker
                                    selectedValue={this.state.selectedAddressFilter}
                                    onValueChange={(value) => this.onAddressFilterUpdate(value)} >
                                    {myAddresses}
                                </Picker>
                            </View>
                        </View>
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
