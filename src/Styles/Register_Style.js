import { StyleSheet,Dimensions } from "react-native";
const altura= Dimensions.get('window').height
const ancho= Dimensions.get('window').width

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    upperContainer: {
        marginTop: '10%',
        width: '95%',
        height: '18%',
        padding:'2%',
        flexDirection: 'row',
        backgroundColor:'rgba(0,0,0,0.1)',
        borderTopColor:'rgba(0,0,0,0)',
        borderLeftColor:'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        borderBottomColor:'rgba(0,0,0,0.1)',
        borderWidth:2,
        borderRadius:15
    },
    upperContainerLeft:{
        flex:1,
        backgroundColor:'white',
        borderRadius:25
    },
    upperContainerRight:{
        flex:2,
        justifyContent:'center',
        alignContent:'center',
    },
    imageStyle:{
        resizeMode:'cover',
        width:'100%',
        height:'100%',
        borderRadius:20,
        borderColor: 'black',
        borderWidth: 2
    },
    contentContainer: {
        width: '95%',
        flex: 1,
        borderTopColor:'rgba(0,0,0,0)',
        borderLeftColor:'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        borderBottomColor:'rgba(0,0,0,1)',
        borderWidth:2
    },
    bottomContainer: {
        width: '95%',
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center'
    },
    bottomContainerLeft: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width: '100%',
        height: '100%'
    },
    bottomContainerRight: {
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        width: '100%',
        height: '100%'
    },
    empresarioMainContainer:{
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        borderRadius:15
    },
    usuarioMainContainer:{
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        borderRadius:15
    },
    mediaContainer:{
        height:'60%',
        borderColor:'blue',
        //borderWidth:2,
        flexDirection:'row'
    },
    mediaContainerLeft:{
        flex:1,
        height:altura*0.15,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        padding:'1%'
    },
    mediaContainerRight:{
        flex:1,
        height:altura*0.15,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        padding:'1%'
    },
    mediaImageLeft:{
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        height:'95%',
        width:'95%',
    },
    mediaImageRight:{
        borderColor:'rgba(0,0,0,0.1)',
        borderWidth:1,
        height:'95%',
        width:'95%',
        padding:'2%'
    }
})