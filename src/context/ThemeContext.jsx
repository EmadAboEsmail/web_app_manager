// ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// إنشاء سياق الموضوع
const ThemeContext = createContext();

// موفر الموضوع
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // محاولة استرجاع الحالة من localStorage
        const savedTheme = localStorage.getItem('dark-mode');
        return savedTheme === 'true'; // إرجاع true إذا كانت الحالة محفوظة كـ 'true'
    });

    // دالة لتبديل الوضع
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode); // عكس الحالة الحالية
    };

    // تحديث الجسم بناءً على الوضع
    useEffect(() => {
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light'); // تعيين السمة
        localStorage.setItem('dark-mode', isDarkMode); // حفظ الحالة في localStorage
    }, [isDarkMode]); // تعتمد على isDarkMode

    // توفير الحالة والدالة للمكونات الفرعية
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// دالة لاستخدام سياق الموضوع
export const useTheme = () => useContext(ThemeContext);
