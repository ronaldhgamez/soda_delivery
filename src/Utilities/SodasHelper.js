import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
//const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC
const uri = 'https://soda-nodejs-backend.herokuapp.com'

async function getSodas() {
    let response = await fetch(`${uri}/api/getSodas`);
    let data = await response.json();
    return data.sodas;
}

const modifySodas = async (description, exact_direction, name, owner, type, cafe_username) => {

    const body = {
        "cafe_username": cafe_username,
        "description": description,
        "exact_direction": exact_direction,
        "name": name,
        "owner": owner,
        "type": type,
    };

    try {
        const response = await fetch(`${uri}/api/updateCafe`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        let json = await response.json();
        return json.updated;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getInformation = async (cafe_username) => {
    console.log(cafe_username);
    const response = await fetch(`${uri}/api/getCafeData`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cafe_username": cafe_username })
    })
    return await response.json();
}

const deleteCafes = async (cafe_username) => {
    const response = await fetch(`${uri}/api/deleteCafe`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cafe_username": cafe_username })
    });
    let json = await response.json();
    return json.deleted;
}

export {
    getSodas,
    modifySodas,
    getInformation,
    deleteCafes
}