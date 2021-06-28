import { StyleSheet, Dimensions } from 'react-native'
const altura = Dimensions.get('window').height
const ancho = Dimensions.get('window').width

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    upperContainer: {
        marginTop: altura * 0.05,
        height: '8%',
        width: '98%',
        borderWidth: 1,
        borderRadius: 25,
        borderTopColor: 'rgba(0,0,0,0)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
    upperContainerText: {
        color: 'blue',
        fontSize: altura * 0.03,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1,
        borderWidth: 2,
        width: '98%',
        borderTopColor: 'rgba(0,0,0,0)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        borderRadius: 20,
        
    },
    buttonsContainer: {
        height: altura * 0.05,
        justifyContent: 'center',
        alignContent: 'center',
        width: '60%',
        alignItems: 'center'
    },
    buttonsContainerText: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: 10,
        borderColor: 'red',
        fontWeight:'bold',
        borderWidth: 1,
        width: '95%',
        height: '95%',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    dynamicContainer:{
        borderColor:'blue',
        borderWidth:0.5,
        borderRadius:10,
        marginBottom:2,
        marginTop:2,
        padding:5,
    },
    dynamicContainerDetailsText:{
        color:'grey',
        textAlign:'right',
        fontStyle:'italic',
        backgroundColor:'rgba(0,0,0,0.03)',
        borderRadius:15
    },
    dynamicText:{
        textAlign:'left',
        fontWeight:'bold'
    },
    dynamicTextLink:{
        textAlign:'left',
        fontWeight:'bold',
        color:'blue',
        fontStyle:'italic'
    },
    subtitleContainer:{
        marginTop: altura * 0.05,
        width: '70%',
        borderWidth: 1,
        borderRadius: 25,
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
    subtitleContainerText:{
        color: 'blue',
        fontSize: altura * 0.02,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    generalContainer:{
        borderRadius:10,
        width:'95%',
        padding:5,
        marginTop:8,
        backgroundColor:'rgba(0,0,0,0.1)'
    },
    productsContainer:{
        backgroundColor:'rgba(0,0,0,0.1)',
        flex: 1,
        borderWidth: 2,
        width: '98%',
        borderTopColor: 'rgba(0,0,0,0)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        borderRadius: 20
    },
    dynamicProductContainer:{
        //flex:1,
        //flexDirection:'row',
        borderColor:'red',
        borderWidth:2
    },
    dynamicProductContainerLeft:{
        flex:1,
        borderColor:'green',
        borderWidth:2
    },
    dynamicProductContainerRight:{
        flex:2,
        borderColor:'green',
        borderWidth:2
    },
    imgProductContainer:{
        width:'100%',
        height:'100%',
        borderColor:'blue',
        borderWidth:2
    }
})