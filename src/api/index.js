import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://127.0.0.1:8000'; // تأكد من ضبط عنوان API الخاص بك


export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
};


export const getUserById = async (userId) => {
    try {
        const users = await getAllUsers(); // استدعاء دالة الحصول على جميع المستخدمين
        const user = users.find(user => user.id -1 === userId); // البحث عن المستخدم
        return user || null; // إرجاع المستخدم أو null إذا لم يتم العثور عليه
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // إعادة رمي الخطأ ليتم التعامل معه في مكان آخر
    }
};




export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/`, userData);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    await axios.delete(`${API_URL}/users/${userId}`);
};// دالة لجلب فئات الدخل
export const fetchIncomeCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/income_categories/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching income categories: ' + error.message);
    }
};

// دالة لإضافة فئة دخل جديدة
export const addIncomeCategory = async (category) => {
    try {
        const response = await axios.post(`${API_URL}/income_categories/`, category);
        return response.data;
    } catch (error) {
        throw new Error('Error adding income category: ' + error.message);
    }
};

// دالة لتحديث فئة دخل موجودة
export const updateIncomeCategory = async (id, category) => {
    try {
        const response = await axios.put(`${API_URL}/income_categories/${id}/`, category);
        return response.data;
    } catch (error) {
        throw new Error('Error updating income category: ' + error.message);
    }
};

// دالة لحذف فئة دخل
export const deleteIncomeCategory = async (id) => {
    try {
        await axios.delete(`${API_URL}/income_categories/${id}/`);
    } catch (error) {
        throw new Error('Error deleting income category: ' + error.message);
    }
};

// دالة لجلب المستخدمين
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// دالة لجلب المصاريف
export const getExpenses = async () => {
    try {
        const response = await axios.get(`${API_URL}/expenses/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching expenses: ' + error.message);
    }
};

// دالة لجلب الدخل
export const getIncome = async () => {
    try {
        const response = await axios.get(`${API_URL}/incomes/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching income: ' + error.message);
    }
};
export const addIncome = async (incomeData) => {
    try {
        const response = await axios.post(`${API_URL}/incomes/`, incomeData);
        return response.data; // إرجاع البيانات المستلمة من الخادم
    } catch (error) {
        throw new Error('Error adding income: ' + error.message);
    }
};


// دالة لتحديث دخل موجود
export const updateIncome = async (id, incomeData) => {
    try {
        const response = await axios.put(`${API_URL}/incomes/${id}/`, incomeData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating income: ' + error.message);
    }
};

export const deleteIncome = async (id) => {
    try {
        await axios.delete(`${API_URL}/incomes/${id}/`);
    } catch (error) {
        throw new Error('Error deleting income: ' + error.message);
    }
};


// دالة لجلب المقالات
export const getArticles = async () => {
    try {
        const response = await axios.get(`${API_URL}/articles/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching articles: ' + error.message);
    }
};

// دالة تسجيل المستخدم
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

// دالة تسجيل دخول المستخدم
export const loginUser = async (username, password) => {
    try {
        const data = qs.stringify({
            grant_type: 'password',
            username: username,
            password: password,
        });

        const response = await axios.post(`${API_URL}/token`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('userId', response.data.user_id);
        return response.data;
    } catch (err) {
        throw new Error(err.response ? err.response.data.detail || 'Login failed. Please check your username and password.' : 'Network error. Please try again later.');
    }
};

// دالة لجلب ملف تعريف المستخدم
export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) throw new Error('No token found');
    if (!userId) throw new Error('User ID not found');

    try {
        const response = await axios.get(`${API_URL}/users/${userId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (err) {
        // تحسين معالجة الأخطاء
        const errorMessage = err.response
            ? err.response.data.detail || 'Failed to fetch user profile.'
            : 'Network error: Unable to reach the server.';
        throw new Error(`Error fetching user profile: ${errorMessage}`); // إضافة تفاصيل الخطأ
    }
};// دالة لجلب مصاريف المستخدم
export const getUserExpenses = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/expenses/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user expenses: ' + error.message);
    }
};

// دالة لجلب دخل المستخدم
export const getUserIncomes = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/incomes/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user incomes: ' + error.message);
    }
};

// دالة لجلب مقالات المستخدم
export const getUserArticles = async (userId) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/articles/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user articles: ' + error.message);
    }
};
