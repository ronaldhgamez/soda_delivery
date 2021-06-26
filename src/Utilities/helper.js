import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native'


export const loadImageFromGallery = async (array) =>{
    //Information of the selected file
    const response = {status: false, image: null}

    //Ask to the user about the permissions for access to the images and videos
    const resultPermisions  = await Permissions.askAsync(Permissions.CAMERA)

    //The user denied the permision
    if(resultPermisions.status === "denied"){
        Alert.alert("Debes de dar permiso para acceder a las imágenes del teléfono!")
        return response;
    }

    //Get the image or video
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: array,
        quality: 1,
    });

    //The user don't select the image
    if (result.cancelled){
        return response;
    }

    //Save the information of the selected file and return this data
    response.status = true;
    response.image = result.uri;
    return response;
}

//Convert the file(image or video) in blob for update to the firebase
export const fileToBlob = async (path) =>{
    const file = await fetch(path)
    const blob =  await file.blob()
    return blob;
}
