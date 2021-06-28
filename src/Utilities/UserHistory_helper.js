import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
//const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC
const uri = 'https://soda-nodejs-backend.herokuapp.com'

async function getUserOrders(userName) {
    let response = await fetch(`${uri}/api/getUserOrders`, {
        method: "post",
        body: JSON.stringify({ user: userName }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    return data;
}
async function getCafeData(cafe_username) {
    let response = await fetch(`${uri}/api/getCafeData`, {
        method: 'post',
        body: JSON.stringify({ cafe_username: cafe_username }),
        headers: { 'Content-type': 'application/json' }
    })
    let data= await response.json();
    return data;
}
async function getOrderData(id_order){
    let response = await fetch(`${uri}/api/getOrderData`, {
        method: "post",
        body: JSON.stringify({ id_order: id_order }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    return data;
}
async function getProductsOfOrders(id_order){
    let response = await fetch(`${uri}/api/getProductsOfOrders`, {
        method: "post",
        body: JSON.stringify({ id_order: id_order }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    return data;
}
async function getProductData(id_product){
    let response = await fetch(`${uri}/api/getProductData`, {
        method: "post",
        body: JSON.stringify({ id_product: id_product }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    return data;
}

export {
    getUserOrders,
    getCafeData,
    getOrderData,
    getProductsOfOrders,
    getProductData
}