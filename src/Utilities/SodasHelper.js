import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC

async function getSodas() {
    let response = await fetch(`${uri}/api/getSodas`);
    let data = await response.json();
    console.log(data.sodas);
    return data.sodas;
}



export {
    getSodas
}