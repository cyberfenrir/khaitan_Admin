const API_URL = "http://localhost:3001/api/v1";

export const createColor = async (name, hex) => {
    try{
        const data = await fetch(`${API_URL}/colors/`,{
            method : "POST",
            credentials : "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ colorName: name, colorHex: hex })
        });
        return data.json();
    }
    catch (err) {
        console.log("Color Creation Service Error: ",err);
    }
}

export const getAllColors = async () => {
    try{
        const data = await fetch (`${API_URL}/colors`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetAllColors Service Error: ",err);
    }
}

export const updateColor = async (colorId, hexCode) => {
    try{
        const data = await fetch(`${API_URL}/colors/${colorId}`,{
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ colorHex: hexCode })
        });
        return data.json();
    }
    catch(err){
        console.log("UpdateColor Service Error: ",err);
    }
}

export const colorById = async (colorId) => {
    try{
        const data = await fetch(`${API_URL}/colors/${colorId}`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }
    catch(err){
        console.log("ColorById Service Error: ",err);
    }
}