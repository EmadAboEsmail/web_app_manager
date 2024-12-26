import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // استيراد الـ reducer

const store = configureStore({
    reducer: {
        user: userReducer, // إضافة الـ reducer إلى المتجر
    },
});

export default store; // تصدير المتجر

