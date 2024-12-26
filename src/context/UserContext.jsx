// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [usernow, setUsernow] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null; // استرجاع بيانات المستخدم من localStorage
    });

    const updateUser = (user) => {
        setUsernow(user);
        localStorage.setItem('user', JSON.stringify(user)); // تخزين بيانات المستخدم في localStorage
    };

    const logout = () => {
        setUsernow(null);
        localStorage.removeItem('user'); // إزالة بيانات المستخدم من localStorage
    };

    return (
        <UserContext.Provider value={{ usernow, updateUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
