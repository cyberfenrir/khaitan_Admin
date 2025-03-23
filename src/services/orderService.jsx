const API_URL = "http://localhost:3001/api/v1";

export const getAllOrders = async () => {
    try{
        const data = await fetch(`${API_URL}/orders/admin`,{
            method: "GET",
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