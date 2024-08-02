import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const data = await api.get('/auth/me/');
                    setUser(data);
                } catch (err) {
                    console.error("Session expired or invalid token");
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (username, password) => {
        const data = await api.post('/auth/login/', { username, password });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        // Fetch user data after login using generic get
        const userData = await api.get('/auth/me/');
        setUser(userData);
        return data;
    };

    const register = async (userData) => {
        return await api.post('/auth/register/', userData);
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
