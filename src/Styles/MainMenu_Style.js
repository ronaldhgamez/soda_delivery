import React from 'react'
import { StyleSheet,Dimensions } from 'react-native'

const altura= Dimensions.get('window').height
const ancho= Dimensions.get('window').width

export default StyleSheet.create({
    MainMenu: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderWidth: 1,
        width: '100%',
        height: '100%',
    },
    searchBar: {
        marginTop: '15%',
        width: '95%',
        height: '7%',
        maxHeight: '7%',
        display:'flex',
        flexDirection:'row'
    },
    content: {
        alignContent: 'center',
        flex: 1,
        width: '95%',
        marginTop: 10,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    bottonView: {
        width: '100%',
        height:'6%',
        flexDirection:'row'
    },
    dinamycMainContainer: {
        flex: 1,
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        padding: '0.5%',
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        marginBottom:2
    },
    dinamycLeftSide: {
        flex: 2,
        alignContent:'center',
        alignItems:'center'
    },
    dinamycRightSide: {
        flex: 3,
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:'center'
    },
    dinamycPintureContainer: {
        borderColor: 'black',
        borderWidth: 2,
        width: '100%',
        //height: "100%",
        height: 0.20*altura,
        alignItems: 'center',
        borderRadius: 6,
    },
    dinamycPicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 3,
        flex: 1,
        flexDirection: 'row'
    },
    dinamycData: {
        textAlign: 'center',
        borderBottomColor:'rgba(70, 129, 240, 0.4)',
        borderBottomWidth:1,
        width:'90%',
        fontWeight:'bold'
    },
    searchBarContainer: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0)',
        borderColor: 'rgba(52, 52, 52, 0)',
        flex:8
    },
    searBarInput:{
        height:'100%',
        backgroundColor: 'rgba(70, 129, 240, 0.9)',
    },
    filterIconContainer:{
        flex:1.5,
    },
    bottomIcon:{
        flex:1,
        backgroundColor:'rgba(45, 107, 224, 0.9)'
    },
    filtersMainContainer:{
        borderColor:'blue',
        borderWidth:1,
        width:'98%',
        flex:1
    }
})