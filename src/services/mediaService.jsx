const API_URL = "http://localhost:3001/api/v1";

export const createMedia = async (productId, colorId, file) => {
    try {
        const formData = new FormData();
        formData.append('media', file);
        formData.append('type', 'product');
        formData.append('productId', productId);
        formData.append('colorId', colorId);
        
        const response = await fetch(`${API_URL}/media`, {
            method: "POST",
            credentials: "include",
            body: formData
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create media');
        }
        
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log("CreateMedia Service Error: ", err);
        throw err;
    }
};

export const deleteMedia = async (mediaId) => {
    try {
        const response = await fetch(`${API_URL}/media/${mediaId}`, {
            method: "DELETE",
            credentials: "include"
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete media');
        }
        
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log("DeleteMedia Service Error: ", err);
        throw err;
    }
};

export const getAllMedias = async () => {
    try {
        const response = await fetch(`${API_URL}/media`, {
            method: "GET",
            credentials: "include"
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch medias');
        }
        
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.log("GetAllMedias Service Error: ", err);
        throw err;
    }
}