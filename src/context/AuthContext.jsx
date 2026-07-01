import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('ch_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('ch_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('ch_user');
        }
    }, [user]);

    const login = (name, phone) => {
        const userData = { name, phone, loggedInAt: Date.now() };
        setUser(userData);
        return userData;
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
