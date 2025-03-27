import API_URL from '../config';

export const getAllUsers = async () => {
    try{
        const data = await fetch(`${API_URL}/users/regular`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data.json();
    }
    catch(err){
        console.log("GetAllUsers service error: ", err);
    }
}