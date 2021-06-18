import React from 'react'
import fetch from 'node-fetch'
import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(':').shift()}:4000` //comment this if testing on PC


async function login(userName,password){
    let response = await fetch(`${uri}/api/login`, {
        method: "post",
        body: JSON.stringify({ userName: userName,password:password}),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    if (data.msg !== false) {
        return data.msg;
    } else {
        return false
    }
}

async function registerUser(info){
    let response = await fetch(`${uri}/api/registerUser`, {
        method: "post",
        body: JSON.stringify(info),
        headers: { 'Content-type': 'application/json' }
    });
    let data = await response.json();
    if (data.msg) {
        return true
    } else {
        return false
    }
}
export{
    login,
    registerUser
}