import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import {Alert} from 'react-native'

export const loadImageFromGallery = async (array) =>{
    const response = {status: false, image: null}
    const resultPermisions  = await Permissions.askAsync(Permissions.CAMERA)
    //The user denied the permision
    if(resultPermisions.status === "denied"){
        Alert.alert("Debes de dar permiso para acceder a las imágenes del teléfono!")
        return response;
    }
    //Get the image
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect : array
    })
    //The user don't select the image
    if (result.cancelled){
        return response;
    }
    response.status = true;
    response.image = result.uri;
    return response;
}

export const fileToBlob = async (path) =>{
    const file = await fetch(path)
    const blob = await file.blob()
    return blob;
}