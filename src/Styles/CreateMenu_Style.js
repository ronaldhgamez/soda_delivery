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
        fontSize: wp(6),
        color: '#fff',
        textAlign:'center'
    },
    inputsContainer:{
        flexDirection: 'row',
        padding: hp(1)
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
        width: wp(6),
        height: hp(6),
        resizeMode: 'repeat'
    }
})
