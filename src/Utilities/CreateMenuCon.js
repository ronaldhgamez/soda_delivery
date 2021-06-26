import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC

async function addMenu(info) {
    const res = await fetch(`${uri}/api/addMenu`, {
        method:'post',
        headers:{ 'Content-type': 'application/json' },
        body:JSON.stringify(info)
    })
    const data = await res.json()
    return data.id_menu;
}

async function addProduct(info) {
    const res = await fetch(`${uri}/api/addProduct`, {
        method:'post',
        headers:{ 'Content-type': 'application/json' },
        body:JSON.stringify(info)
    })
    const data = await res.json()
    return data.inserted;
}



export {
    addMenu,
    addProduct
}
