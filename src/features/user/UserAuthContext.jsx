import { createContext, useContext, useEffect, useState } from 'react';
import { USER_TOKEN_KEY, userRequest } from './userApi';

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(localStorage.getItem(USER_TOKEN_KEY)));

    useEffect(() => {
        if (!localStorage.getItem(USER_TOKEN_KEY)) return;
        let active = true;
        userRequest('/users/me')
            .then((data) => { if (active) setUser(data.user || data); })
            .catch(() => {
                if (!active) return;
                localStorage.removeItem(USER_TOKEN_KEY);
                setUser(null);
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    async function authenticate(path, credentials) {
        const data = await userRequest(path, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
        if (!data.token) throw new Error('The server did not return an authentication token.');
        localStorage.setItem(USER_TOKEN_KEY, data.token);
        setUser(data.user || null);
        return data.user || null;
    }

    async function login(credentials) {
        return authenticate('/users/login', credentials);
    }

    async function register(credentials) {
        return authenticate('/users/register', credentials);
    }

    async function updateProfile(profile) {
        const data = await userRequest('/users/me', {
            method: 'PUT',
            body: JSON.stringify(profile),
        });
        const updatedUser = data.user || data;
        setUser(updatedUser);
        return updatedUser;
    }

    function logout() {
        localStorage.removeItem(USER_TOKEN_KEY);
        setUser(null);
    }

    const value = { user, loading, login, register, updateProfile, logout };
    return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}

export function useUserAuth() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error('useUserAuth must be used within UserAuthProvider.');
    return context;
}
