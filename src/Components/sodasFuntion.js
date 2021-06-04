import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const baseURL = `http://${manifest.debuggerHost.split(':').shift()}:4000`

const modifySoda = async (nombre, dueno, descripcion, direccion, tipoComida, usuario) => {
    const url = baseURL + '/api/ModifySoda';
    const body = {
        "nombre": nombre,
        "dueno": dueno,
        "descripcion": descripcion,
        "direccion": direccion,
        "tipoComida": tipoComida,
        "usuario":usuario
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        let json = await response.json(); // json={ inserted: <true|false> }
        return json.inserted;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export{
    modifySoda
}