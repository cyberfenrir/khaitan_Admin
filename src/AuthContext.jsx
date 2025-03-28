import { createContext, useState, useEffect, useContext } from 'react';
import { signIn, signUp, verifyUser } from './services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            setSuccess(true);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await signIn(email, password);
        // console.log("Response from AuthContext: ", response);
        if (response.sucess) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data.user.id));
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setSuccess(true);
            setIsLoggedIn(true);
        } else {
            setSuccess(false);
        }
        return response;
    };

    const register = async (email, password, name, phoneNumber, reqRole) => {
        const response = await signUp(email, password, name, phoneNumber, reqRole);
        if (response.sucess) {
            //localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            setSuccess(true);
            setIsLoggedIn(true);
        }
        return response;
    };
    
    const userVerification = async (id, otp) => {
        const response = await verifyUser(id, otp);
        if (response.success) {
            setUser(response.data.id);
            //localStorage.setItem('user', JSON.stringify(response.data.id));
            setSuccess(true);
            setIsLoggedIn(true);
        }
        return response;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('token');
        setSuccess(false);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, loading, login, register, logout, userVerification, success }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
