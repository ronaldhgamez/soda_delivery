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
    }
})