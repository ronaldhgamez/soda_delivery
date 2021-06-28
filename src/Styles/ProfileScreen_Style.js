import { StyleSheet, Dimensions } from 'react-native'
const altura = Dimensions.get('window').height
const ancho = Dimensions.get('window').width


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    upperView: {
        width: '100%',
        height: '23%',
        marginTop: '10%',
        backgroundColor: 'rgba(177, 177, 179,0.4)',
        display: 'flex',
        flexDirection: 'row',
        padding: '4%'
    },
    upperView_Container1: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20
    },
    contentView: {
        width: '100%',
        flex: 1,
        borderBottomColor: 'grey',
        borderTopColor: 'rgba(1,1,1,0)',
        borderRightColor: 'rgba(1,1,1,0)',
        borderLeftColor: 'rgba(1,1,1,0)',
        borderStartColor: 'rgba(1,1,1,0)',
        borderEndColor:'rgba(1,1,1,0)',
        borderWidth: 3
    },
    bottonView: {
        width: '100%',
        height: '6%',
        flexDirection: 'row',
    },
    bottomIcon: {
        flex: 1,
        backgroundColor: 'rgba(45, 107, 224, 0.9)'
    },
    imageView: {
        flex: 2,
        padding: '1%'
    },
    nameView: {
        flex: 3,
        justifyContent: 'space-around',
        padding: '1%'
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20
    },
    nameText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 10,
        borderWidth: 1,
        borderBottomColor: 'rgba(83,132,237,0.8)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor: 'rgba(0,0,0,0)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor:'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)'
    },
    editingButton: {
        flexDirection: 'row',
        width: '100%',
        padding: '2%',
    },
    editingButtonLeft: {
        flex: 1,
        alignItems: 'center'
    },
    editingButtonRight: {
        flex: 1,
        alignItems: 'center',
    },
    subtitleViews: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderColor: 'rgba(0,0,0,0.03)',
        borderWidth: 1,
        borderRadius: 10,
        height: altura * 0.03
    },
    subtitleViewsText: {
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: altura * 0.08,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)'
    },
    textInputLabel: {
        fontWeight: 'bold'
    },
    addressEditingContainer: {
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        paddingTop: '3%'
    },
    userHistoryContainer: {
        marginTop:5,
        marginBottom:2,
        padding:4,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius:10,
        borderBottomColor: 'blue',
        //borderBottomColor: 'rgba(0,0,0,0.2)',
        borderStartColor: 'rgba(0,0,0,0)',
        borderEndColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'rgba(0,0,0,0)',
        borderRightColor:'rgba(0,0,0,0)',
        //borderTopColor: 'rgba(0,0,0,0.2)'
        borderTopColor: 'blue'
    },
    userHistoryText: {
        textAlign:'center',
        color: 'blue',
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
})