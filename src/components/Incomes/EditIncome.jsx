import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncome, updateIncome } from '@/api/index'; // تأكد من وجود الدالتين في api.js
import { Form, Input, Button, notification, ConfigProvider } from 'antd';
import '@/styles/addIncome.css'; // استيراد ملف الأنماط

const EditIncome = () => {
    const { id } = useParams(); // الحصول على معرف الدخل من الرابط
    const navigate = useNavigate(); // للتوجيه بعد التعديل
    const [income, setIncome] = useState({ amount: 0, description: '', category_id: 0, date: '', owner_id: 0 }); // حالة لتخزين بيانات الدخل

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const incomeData = await getIncome(id); // جلب بيانات الدخل
                setIncome(incomeData); // تحديث الحالة ببيانات الدخل
            } catch (error) {
                console.error('Error fetching income:', error);
                notification.error({ message: "خطأ في جلب بيانات الدخل" });
            }
        };

        fetchIncome();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            // إعداد البيانات المحدثة
            const updatedData = {
                amount: values.amount,
                description: values.description,
                category_id: values.category_id,
                date: values.date,
                id: parseInt(id), // استخدام المعرف من الرابط
                owner_id: parseInt(localStorage.getItem('selectedUserId')) // استخدام معرف المالك من localStorage
            };

            // إرسال جميع القيم المحدثة
            await updateIncome(id, updatedData);
            notification.success({ message: "تم تحديث الدخل بنجاح!" });
            navigate('/incomes'); // توجيه المستخدم بعد التحديث
        } catch (error) {
            console.error('Error updating income:', error);
            notification.error({ message: "خطأ في تحديث الدخل" });
        }
    };

    return (
        <ConfigProvider direction="rtl">
            <div className="edit-income-container">
                <h4>تعديل الدخل</h4>
                <Form
                    layout="vertical" 
                    onFinish={handleSubmit}
                    initialValues={income} // ملء القيم المبدئية من الحالة
                >
                    <Form.Item
                        label="المبلغ"
                        name="amount"
                        rules={[{ required: true, message: 'يرجى إدخال المبلغ' }]}
                    >
                        <Input 
                            type="number" 
                            placeholder="المبلغ" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="الوصف"
                        name="description"
                        rules={[{ required: true, message: 'يرجى إدخال الوصف' }]}
                    >
                        <Input 
                            placeholder="الوصف" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="معرف الفئة"
                        name="category_id"
                        rules={[{ required: true, message: 'يرجى إدخال معرف الفئة' }]}
                    >
                        <Input 
                            type="number"
                            placeholder="معرف الفئة" 
                        />
                    </Form.Item>
                    <Form.Item
                        label="التاريخ"
                        name="date"
                        rules={[{ required: true, message: 'يرجى اختيار التاريخ' }]}
                    >
                        <Input 
                            type="date" 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            تحديث
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
};

export default EditIncome;
