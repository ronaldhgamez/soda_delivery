import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    /* Profile */
    profile_card: {
        marginBottom: 1,
        backgroundColor: 'white',
        elevation: 3,
        marginHorizontal: 5
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
        fontSize: 12,
        marginLeft: 5,
    },


    /* Menu and plates */
    menu_container: {
        backgroundColor: '#f8eb34',
        borderRadius: 15,
        margin: 5,
    },
    menu: {
        borderRadius: 5,
    },
    plate_card: {
        alignSelf: 'center',
        marginVertical: '1.5%',
        width: '95%',
        backgroundColor: 'azure',
        elevation: 3,
    },
    plate_image: {
        width: '100%',
        height: 175,
        resizeMode: 'cover'
    },
    textMenuName: {
        fontSize: 23,
        marginLeft: 5,
        fontWeight: 'bold',
        //color: '',
        alignSelf: 'center',
        margin: 2
    },
    textPlateName: {
        fontSize: 17,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    textPlateDescription: {
        fontSize: 12,
        marginLeft: 5,
    },
    textPrice: {
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 5,
        color: 'deeppink',
        fontWeight: 'bold',
    }
})
