import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC

async function getUserInfo(userId) {
    let response = await fetch(`${uri}/api/getClientData`, {
        method: "post",
        body: JSON.stringify({ idUser: userId }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    if (data.msg !== false) {
        return data.msg;
    } else {
        return -1
    }
}

async function getUserPhone(userId) {
    let response = await fetch(`${uri}/api/getClientPhone`, {
        method: "post",
        body: JSON.stringify({ idUser: userId }),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    if (data.msg !== false) {
        console.log(data.msg.telefono)
        return data.msg;
    } else {
        return -1
    }
}
async function updateUserInfo(data) {
    let response = await fetch(`${uri}/api/updateUserInfo`, {
        method: "post",
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    });
    let res = await response.json();
    return res.msg;
}
export {
    getUserInfo,
    getUserPhone,
    updateUserInfo
}