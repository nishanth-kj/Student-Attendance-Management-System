import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.getCurrentUser();
                    setUser(response.data);
                } catch (err) {
                    // Token invalid or expired
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (username, password) => {
        const response = await api.login(username, password);
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Fetch user data after login
        const userRes = await api.getCurrentUser();
        setUser(userRes.data);
        return response.data;
    };

    const register = async (userData) => {
        const response = await api.register(userData);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
