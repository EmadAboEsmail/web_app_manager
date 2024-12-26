import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        selectedUserId: null, // الحالة الأولية
    },
    reducers: {
        setSelectedUserId(state, action) {
            state.selectedUserId = action.payload; // تعيين معرف المستخدم المحدد
        },
        clearSelectedUserId(state) {
            state.selectedUserId = null; // إعادة تعيين معرف المستخدم
        },
    },
});

// تصدير الدوال
export const { setSelectedUserId, clearSelectedUserId } = userSlice.actions;

export default userSlice.reducer; // تصدير الـ reducer

