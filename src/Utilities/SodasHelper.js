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

async function getProducts(cafe_username) {
    let returnList = []
    try {
        const response = await fetch(`${uri}/api/getCafeMenus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "cafe_username": cafe_username })
        });

        let listMenu = await response.json();
        for(var i in listMenu) {
            let idMenu = listMenu[i].id_menu

            try {
                const responses = await fetch(`${uri}/api/getProductsMenu`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "id_menu": idMenu })
                });

                let listProducts = await responses.json();
                if ((Object.keys(listProducts).length) !== 0 ){
                    for(var g in listProducts){
                        returnList.push(listProducts[g].name)
                    }
                }

            } catch (error) {
                console.log(error);
                return false;
            }
        }
        return returnList;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getTypes(userNameSoda){
    let returnList = []
    try {
        const responses = await fetch(`${uri}/api/getCafeMenus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"cafe_username": userNameSoda})
        });

        let listMenu = await responses.json();
        if ((Object.keys(listMenu).length) !== 0 ){
            for(var g in listMenu){
                returnList.push(listMenu[g].description)
            }
        }

    } catch (error) {
        console.log(error);
        return false;
    }
    return returnList;
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
    const response = await fetch(`${uri}/api/getCafeData`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cafe_username": cafe_username })
    })
    return await response.json();
}


export {
    getSodas,
    modifySodas,
    getInformation,
    getProducts,
    getTypes
}
