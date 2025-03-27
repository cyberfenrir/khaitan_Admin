import API_URL from '../config';


export const createProduct = async (title, description, price, categoryId) => {
    try{
        const data = await fetch(`${API_URL}/products/`,{
            method : "POST",
            credentials : "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, price: price, categoryId: categoryId })
        });
        return data.json();
    }
    catch (err) {
        console.log("Product Creation Service Error: ",err);
    }
}

export const getAllProducts = async () => {
    try{
        const data = await fetch (`${API_URL}/products`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetAllProducts Service Error: ",err);
    }
}

export const getProductById = async (productId) => {
    try{
        const data = await fetch (`${API_URL}/products/${productId}`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetProductById Service Error: ",err);
    }
}

export const getProductWithAttributeAndMedia = async (productId) => {
    try{
        const data = await fetch (`${API_URL}/products/${productId}/attributes/media`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetProductWithAttributeAndMedia Service Error: ",err);
    }
}

export const addAttrtoProductBulk = async (productId, payload) => {
    try{
        const data = await fetch (`${API_URL}/products/${productId}/attributes/bulk`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        return data.json();
    }
    catch(err){
        console.log("AddAttr in Bulk service error: ",err);
    }
}

export const getAttributesForProduct = async (productId) => {
    try{
        const data = await fetch (`${API_URL}/products/${productId}/attributes`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetAttributesForProduct Service Error: ",err);
    }
}