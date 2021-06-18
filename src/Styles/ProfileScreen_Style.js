import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    upperView:{
        width:'100%',
        height:'23%',
        marginTop:'10%',
        backgroundColor:'rgba(177, 177, 179,0.4)',
        display:'flex',
        flexDirection:'row',
        padding:'4%'
    },
    upperView_Container1:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        borderRadius:20
    },
    contentView:{
        width:'100%',
        flex:1,
        borderBottomColor:'grey',
        borderTopColor:'rgba(1,1,1,0)',
        borderRightColor:'rgba(1,1,1,0)',
        borderLeftColor:'rgba(1,1,1,0)',
        borderWidth:3
    },
    bottonView: {
        width: '100%',
        height:'6%',
        flexDirection:'row',
    },
    bottomIcon:{
        flex:1,
        backgroundColor:'rgba(45, 107, 224, 0.9)'
    },
    imageView:{
        flex:2,
        padding:'1%'
    },
    nameView:{
        flex:3,
        justifyContent:'space-around',
        padding:'1%'
    },
    imageContainer:{
        width:'100%',
        height:'100%',
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderColor:'black',
        borderWidth:2,
        borderRadius:20
    },
    nameText:{
        textAlign:'center',
        fontSize:20,
    },
    editingButton:{
        flexDirection:'row',
        width:'100%',
        padding:'2%',
    },
    editingButtonLeft:{
        flex:1,
        alignItems:'center'
    },
    editingButtonRight:{
        flex:1,
        alignItems:'center',
    }
})