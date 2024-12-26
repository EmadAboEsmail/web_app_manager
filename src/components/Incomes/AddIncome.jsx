import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '@/context/AppText';
import { addIncome, fetchIncomeCategories, getUserProfile } from '@/api/index'; // استيراد الدالة الجديدة

const AddIncome = () => {
    const [amount, setAmount] = useState(0); // تعيين القيمة الافتراضية إلى 0
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]); // حالة لتخزين الفئات
    const [selectedCategory, setSelectedCategory] = useState(0); // تعيين القيمة الافتراضية
    const [ownerId, setOwnerId] = useState(0); // حالة لتخزين owner_id
    const { setNotification } = useContext(AppContext); // استخدام السياق

    // دالة لجلب الفئات من API
    const loadCategories = async () => {
        try {
            const categoriesData = await fetchIncomeCategories(); // استخدم الدالة الجديدة
            setCategories(categoriesData); // تخزين الفئات
        } catch (error) {
            console.error('Error fetching categories:', error);
            setNotification({ message: "Error fetching categories", type: "error" });
        }
    };

    // دالة للحصول على بيانات المستخدم
    const loadUserProfile = async () => {
        try {
            const userProfile = await getUserProfile();
            setOwnerId(userProfile.id); // تخزين owner_id من بيانات المستخدم
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setNotification({ message: error.message, type: "error" });
        }
    };

    useEffect(() => {
        loadCategories(); // استدعاء الدالة عند تحميل المكون
        loadUserProfile(); // استدعاء دالة جلب بيانات المستخدم
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        try {
            const incomeData = {
                amount: amount, // استخدم القيمة المدخلة
                description: description,
                category_id: selectedCategory, // استخدم الفئة المحددة
                date: date, // تأكد من أن التاريخ بتنسيق صحيح
                id: 0, // تعيين id إلى 0
                owner_id: ownerId // استخدام owner_id المخزن
            };
            await addIncome(incomeData);
            setNotification({ message: "Income added successfully!", type: "success" });
            // إعادة تعيين الحقول
            setAmount(0);
            setDate('');
            setDescription('');
            setSelectedCategory(0);
        } catch (error) {
            console.error('Error adding income:', error);
            setNotification({ message: "Error adding income!", type: "error" });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Add Income</h4>
            <input 
                type="number" 
                placeholder="Amount" 
                value={amount} 
                onChange={(e) => setAmount(parseInt(e.target.value))} // تأكد من تحويل إلى عدد صحيح
                required 
            />
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
            />
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(parseInt(e.target.value))} // تأكد من تحويل إلى عدد صحيح
                required
            >
                <option value={0} disabled>Select Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name} {/* تأكد من أن هذا هو اسم الفئة */}
                    </option>
                ))}
            </select>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddIncome;
