import API_URL from '../config';

export const getAllOrders = async () => {
    try{
        const data = await fetch(`${API_URL}/orders/admin`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }
    catch(err){
        console.log("GetAllOrders Service Error: ",err);
    }
}

export const getOrderDetails = async (orderId) => {
    try{
        const data = await fetch(`${API_URL}/orders/${orderId}`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }
    catch(err){
        console.log("GetOrderDetails Service Error: ",err);
    }
}

export const updateOrderStatus = async (orderId) => {
    try{
        const data = await fetch(`${API_URL}/orders/${orderId}`,{
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }
    catch(err){
        console.log("UpdateOrderStatus Service Error: ",err);
    }
}