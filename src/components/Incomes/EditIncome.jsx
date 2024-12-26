import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncome, updateIncome } from '@/api/index'; // تأكد من وجود الدالتين في api.js

const EditIncome = () => {
    const { id } = useParams(); // الحصول على معرف الدخل من الرابط
    const navigate = useNavigate(); // للتوجيه بعد التعديل
    const [income, setIncome] = useState({ amount: '', date: '', category: '' }); // حالة لتخزين بيانات الدخل

    useEffect(() => {
        const fetchIncome = async () => {
            const incomeData = await getIncome(id); // جلب بيانات الدخل
            setIncome(incomeData); // تحديث الحالة ببيانات الدخل
        };

        fetchIncome();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncome({ ...income, [name]: value }); // تحديث الحالة بناءً على المدخلات
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        try {
            await updateIncome(id, income); // استدعاء دالة التحديث
            navigate('/incomes'); // توجيه المستخدم بعد التحديث
        } catch (error) {
            console.error('Error updating income:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Edit Income</h4>
            <input 
                type="number" 
                name="amount" 
                placeholder="Amount" 
                value={income.amount} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="date" 
                name="date" 
                value={income.date} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                name="category" 
                placeholder="Category" 
                value={income.category} 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditIncome;

