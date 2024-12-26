import React, { createContext, useState } from 'react';

// إنشاء السياق
export const AppContext = createContext();

// مكون مزود السياق
export const AppProvider = ({ children }) => {
    const [notification, setNotification] = useState(null); // حالة لإدارة التنبيهات

    const clearNotification = () => {
        setNotification(null); // دالة لمسح التنبيه
    };

    return (
        <AppContext.Provider value={{ notification, setNotification, clearNotification }}>
            {children}
        </AppContext.Provider>
    );
};
