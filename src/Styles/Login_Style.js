import { StyleSheet } from "react-native";


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    secondaryContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 25,
        width: '90%',
        height: '60%',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    upperContainer: {
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        height: '60%',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    BottomContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        width: '90%',
        height: '25%',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    textStyle:{
        textAlign:'center',
        color:'blue'
    },
    inputStyle: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '95%',
        height: '10%',
        borderRadius: 25,
        backgroundColor:'white',
    }
})