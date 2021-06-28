import fetch from 'node-fetch'
const baseURL = 'https://soda-nodejs-backend.herokuapp.com';

const orderFoodFirebase = async (user, cafe_username, total, order_list) => {
    var datetime = getCurrentTime();
    const body_order = {
        "user": user,
        "cafe_username": cafe_username,
        "total": total,
        "datetime": datetime,
        "state": "pending"
    }
    // Add order and get the order_id
    const response = await fetch(`${baseURL}/api/orderFood`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body_order)
    });

    const json = await response.json();
    if (json.ordered) {
        const id_order = json.id_order;
        for await (let product of order_list) {
            await insertOrderProduct(id_order, product.id_product, product.amount);
        }
        return true;
    } else
        return false;
}

const insertOrderProduct = async (id_order, id_product, amount) => {
    const response = await fetch(`${baseURL}/api/insertOrderProduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id_order": id_order, "id_product": id_product, "amount": amount })
    })
    const json = await response.json();
    return json.inserted;
}

function getCurrentTime() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}

const getOrders = async cafe_username => {

    const response = await fetch(`${baseURL}/api/getCafesOrders`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cafe_username": cafe_username })
    });
    return await response.json();
}

const changeOrderState = async (id, state) => {

    const response = await fetch(`${baseURL}/api/updateOrderState`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id": id, "state": state })
    });

    const json = await response.json();
    return json.updated;
};

async function getMenus(cafe_username) {
    try {
        const response = await fetch(`${baseURL}/api/getCafeMenus`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "cafe_username": cafe_username })
        });

        let json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getProductsMenu(id_menu) {

    const response = await fetch(`${baseURL}/api/getProductsMenu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id_menu": id_menu })
    });

    let json = await response.json();
    return json;
}

/* to update menu description */
const updateMenu = async (id_menu, description) => {
    const response = await fetch(`${baseURL}/api/updateMenu`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id_menu": id_menu, "description": description })
    });

    let json = await response.json();
    return json.updated;
}

function addAttributesToObjects(data) {
    for (var index in data) {
        data[index].editing = false;
        data[index].new_value = data[index].description;
    }
    return data;
}

function getNextState(state) {
    if (state === 'delivered') return { 'state': '"pendiente"', 'color': 'orangered' };
    return (state === 'pending') ? { 'state': '"preparando"', 'color': 'dodgerblue' } :
        { 'state': '"entregado"', 'color': 'yellowgreen' };
}

// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
/* import { useRef, useEffect } from 'react';
function useIsMounted() {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);
    return isMounted;
} */

export {
    getOrders,
    changeOrderState,
    getMenus,
    getProductsMenu,
    updateMenu,
    addAttributesToObjects,
    getNextState,
    orderFoodFirebase
}