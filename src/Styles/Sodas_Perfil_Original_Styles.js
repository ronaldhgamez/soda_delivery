import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    /* Profile */
    profile_card: {
        marginBottom: 10,
        backgroundColor: 'white',
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 160,
        resizeMode: 'cover'
    },
    textSodaName: {
        fontSize: 24,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 11,
        marginLeft: 5,
    },
    

    /* Menu and plates */
    menu_container: {
        //marginTop: 40
    },
    plate_card: {
        marginBottom: 5,
        marginLeft: '3%',
        width: '94%',
        backgroundColor: 'azure',
        elevation: 3,
    },
    plate_image: {
        width: '100%',
        height: 170,
        resizeMode: 'cover'
    },
    textMenuName: {
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
        color: 'blue',
        alignContent: 'center'
    },
    textPlateName: {
        fontSize: 15,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    textPrice: {
        fontSize: 13,
        //padding: 10,
        marginLeft: 5,
        marginBottom: 5,
        color: 'darkcyan'
    }
})
