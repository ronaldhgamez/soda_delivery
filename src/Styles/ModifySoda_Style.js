import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    container:{
        flex: 1,
        padding: hp(3),
        marginBottom: hp(2),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        fontSize: wp(3),
    },
    lblTittle: {
        fontSize: wp(10),
        fontWeight: "bold"
    },
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#8a2be2",
        marginBottom: 20
    },
    addBtn:{
        width:'100%',
        height:'5%',
        backgroundColor: 'deeppink',
        justifyContent: 'center',
        color:'#fff'
    },
    input: {
        height: 35,
        margin: 12,
        borderWidth: 1
      }

})