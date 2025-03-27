import API_URL from '../config';

export const createCategory = async (name, description) => {
    try{
        const data = await fetch(`${API_URL}/categories/`,{
            method : "POST",
            credentials : "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        });
        return data.json();
    }
    catch (err) {
        console.log("Category Creation Service Error: ",err);
    }
}

export const deleteCategory = async (categoryId) => {
    try{
        const data = await fetch(`${API_URL}/categories/${categoryId}`,{
            method: "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }
    catch(err){
        console.log("DeleteCategory Service Error: ",err);
    }
}

export const getAllCategories = async () => {
    try{
        const data = await fetch (`${API_URL}/categories`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetAllCategories Service Error: ",err);
    }
}

export const getCategoryById = async (categoryId) => {
    try{
        const data = await fetch (`${API_URL}/categories/${categoryId}`,{
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return data.json();
    }
    catch(err){
        console.log("GetCategoryById Service Error: ",err);
    }
}


export const getAllAttributesForACategory = async (categoryId) => {
    try{
        const data = await fetch (`${API_URL}/categories/${categoryId}/attributes`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return data.json();
    }
    catch(err){
        console.log("GetAllAttributesForACategory service Error: ",err);
    }
}

export const createAttributes = async (categoryId, name, datatype, unit) => {
    try{
        const data = await fetch(`${API_URL}/attributes`,{
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId: categoryId, name: name, dataType: datatype, unit: unit })
        })
        return data.json();
    }
    catch(err){
        console.log("CreateAttributes Service Error: ",err);
    }
}