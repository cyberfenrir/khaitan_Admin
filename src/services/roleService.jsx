import API_URL from '../config';


export const getAllRoles = async () => {
    try{
        const data = await fetch(`${API_URL}/roles`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data.json();
    }
    catch(err){
        console.log("GetAllRoles service eroro: ", err);
    }
}

export const getAllPermissions = async () => {
    try{
        const data = await fetch(`${API_URL}/permissions`, {
            method : "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return data.json();
    }
    catch(err){
        console.log("GetAllPermissions service error: ",err);
    }
}

export const createRole = async(name, description, parentRoleId) => {
    try{
        const data = await fetch (`${API_URL}/roles`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, description: description, parentRoleId: parentRoleId})
        });
        return data.json();
    }
    catch(err){
        console.log("CreateRole Service Error: ",err);
    }
}

export const addPermissionsToRoleBulk = async(roleId, permissionIds) => {
    try{
        const data = await fetch(`${API_URL}/roles/${roleId}/permissions/bulk`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({permissionIds: permissionIds})
        })
        return data.json();
    }
    catch(err){
        console.log("AddPermsToRoleBulk service Error: ",err);
    }
}

export const verifyRole = async(userId) => {
    try{
        const data = await fetch(`${API_URL}/users/${userId}/verify/role`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return data.json();
    }
    catch(err){
        console.log("VerifyRole Service Error: ",err);
    }
}

export const getAllUnverifiedUsers = async() => {
    try{
        const data = await fetch(`${API_URL}/users/unverified/role`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return data.json();
    }
    catch(err){
        console.log("GetAllUnverifiedUsers Service Error: ",err);
    }
}