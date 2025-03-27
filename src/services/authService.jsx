import API_URL from '../config';

export const signIn = async (email, password) => {
    try{
        const data = await fetch (`${API_URL}/users/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });
        return data.json();
    }
    catch(err){
        console.log("User SignIn Service Error: ",err);
    }
}

export const signUp = async (email, password, name, phoneNumber, reqRole ) => {
    try{
        const data = await fetch (`${API_URL}/users/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password, name: name, phoneNumber: phoneNumber, roleId: reqRole})
        })
        return data.json();
    }
    catch(err){
        console.log("User SignUp Service Error: ",err);
    }
}

export const verifyUser = async (id, otp) => {
    try{
        const data = await fetch (`${API_URL}/users/${id}/verify/otp`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: otp})
        })
        return data.json();
    }
    catch(err){
        console.log("VerifyOTP Service error: ",err);
    }
}