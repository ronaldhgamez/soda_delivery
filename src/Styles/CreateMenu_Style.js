import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native'


export default StyleSheet.create({
    container:{
        flex: 1,
        padding: hp(5),
        marginBottom: hp(2),
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    lblTittle: {
        fontSize: wp(10),
        fontWeight: "bold"
    },
    addBtn:{
        width:'100%',
        height:'5%',
        backgroundColor: 'deeppink',
        justifyContent: 'center',
        color:'#fff'
    },
    addBtnText:{
        fontSize: wp(15),
        color: '#fff',
        textAlign:'center'
    },
    addBtnT:{
        fontSize: wp(6),
        color: '#fff',
        textAlign:'center'
    },
    addBtnTextImg:{
        fontSize: wp(24),
        color: '#fff',
        textAlign:'center',
        marginRight:hp(2)
    },
    inputsContainer:{
        flexDirection: 'row'
    },
    inputContainer:{
        width: '40%',
        flex:1,
        marginRight:hp(2)
    },
    input:{
        paddingHorizontal:wp(1),
        width:'100%',
        height: hp(5),
        fontSize:wp(5),
        backgroundColor:'#f3f3f3'
    },
    iconHistorial:{
        width: wp(7),
        height: hp(7),
        resizeMode: 'repeat'
    },
    iconHistorialImg:{
        width: wp(9),
        height: hp(9),
        resizeMode: 'repeat'
    }
})
