import React, { Component } from 'react'
import { View, ScrollView, TouchableHighlight, Image, TouchableOpacity,Button } from 'react-native'
import style from '../Styles/MainMenu_Style'
import { Text, Icon, SearchBar } from 'react-native-elements';
const helper = require('../Utilities/SodasHelper')
import { Picker} from '@react-native-community/picker'

let flagY = false;
let filterResult = [] //sodas found

export default class MainMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:this.props.route.params.userName,
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
    
    searchProduct = async (soda, product, sodaT)=>{
        let listProducts = await helper.getProducts(soda);
        for (var i in listProducts){
            let wordLower = listProducts[i].toLowerCase()
            if(wordLower.includes(product)){
                filterResult.push(sodaT)
                this.setState({ sodas: filterResult })
                return;
            }
        }
        return;
    }
    
    searchType = async (soda, type, sodaT)=>{
        let listMenu = await  helper.getTypes(soda);
        for(var i in listMenu){
            let wordLower = listMenu[i].toLowerCase()
            if(wordLower.includes(type)){
                filterResult.push(sodaT)
                this.setState({ sodas: filterResult })
                return;
            }
        }
        return;
    }
    
    verifySoda = async (listSoda, idSoda)=>{
        for(var i in listSoda){
            if(listSoda[i].cafe_username === idSoda){
                flagY = true;
                return;
            }
        }
        flagY = false
        return;
    }

   onSearchUpdate = async (search) => {
        filterResult = []
        //read all sodas
        this.state.sodasBackUp.map((soda) => {

            let searching = search.toLowerCase()    //the thing the user is searching in lowercase
            let partSearching = searching.split(' ') //the thing the user is searching in parts

            for(var i in partSearching){ //verify each word write for the user
                let newSearching = partSearching[i]; //a unic part of the thing the user write
                if(newSearching.length > 2){ //only search words with more of 3 letters
                    this.verifySoda(filterResult,soda.cafe_username)
                    if(flagY === false){
                        let wordLowerED = soda.exact_direction.toLowerCase()
                        let wordLowerD = soda.district.toLowerCase()
                        let wordLowerN = soda.name.toLowerCase()

                        this.searchProduct(soda.cafe_username, newSearching, soda)
                        this.searchType(soda.cafe_username, newSearching, soda)

                        if(wordLowerED.includes(newSearching)){  //the user is searching by exact direction
                            filterResult.push(soda)
                        }
                        else if(wordLowerD.includes(newSearching)){ //the user is searching by district
                            filterResult.push(soda)
                        }

                        else if(wordLowerN.includes(newSearching)){ //the user is searching by name
                            filterResult.push(soda)
                        }
                    }
                }
            }
        })
        this.setState({ sodas: filterResult })

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
            if (!addressLst.includes(sodas[key].district)) {
                addressLst.push(sodas[key].district)
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
                                source={{ uri: soda.img_url }}
                            />
                        </TouchableHighlight>
                    </View>
                    <View style={style.dinamycRightSide}>
                        <Text style={style.dinamycData}>{soda.name}</Text>
                        <Text style={style.dinamycData}>{soda.type}</Text>
                        <Text style={style.dinamycData}>{soda.district+", "+soda.canton}</Text>
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
                    if (soda.district == this.state.selectedAddressFilter && soda.type == this.state.selectedFoodFilter) {
                        filterResult.push(soda)
                    }
                })
            } else if (this.state.selectedAddressFilter !== "Todo") {
                this.state.sodasBackUp.map((soda) => {
                    if (soda.district == this.state.selectedAddressFilter) {
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
    updateSearch = (search) => {
        this.setState({ search: search });
    };

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
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        containerStyle={style.searchBarContainer}
                        inputContainerStyle={style.searBarInput}
                        lightTheme={true}
                        inputStyle={{ color: 'white' }}
                        clearIcon={true}
                        onSubmitEditing={()=>this.onSearchUpdate(this.state.search)}
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
                        onPress={() => this.props.navigation.navigate('ProfileScreen',{'userName':this.state.userName})}
                    />
                    <Icon
                        containerStyle={style.bottomIcon}
                        name='settings'
                        size={45}
                        color='#bbbbbbe0'

                        
                    />
                </View>
            </View>
        )
    }
}
