import fetch from 'node-fetch'
const baseURL = 'https://soda-nodejs-backend.herokuapp.com';

const getOrders = async cafe => {
    
    const response = await fetch(`${baseURL}/api/getCafesOrders`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ "cafe": cafe })
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

export {
    getOrders,
    changeOrderState
}