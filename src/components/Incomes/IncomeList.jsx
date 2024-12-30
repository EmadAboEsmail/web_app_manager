import React, { useEffect, useState, useCallback } from 'react';
import { getUserIncomes, deleteIncome } from '@/api/index';
import { Link } from 'react-router-dom';
import { Modal, message, Button, Spin, List } from 'antd';

import { DeleteOutlined, EditOutlined} from '@ant-design/icons';


const IncomeList = () => {
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const userId = localStorage.getItem('selectedUserId');

    const fetchIncome = useCallback(async () => {
        if (!userId) {
            setError('لم يتم العثور على معرف المستخدم في localStorage.');
            setLoading(false);
            return;
        }

        try {
            const incomeData = await getUserIncomes(userId);
            // console.log('incomeData', incomeData);
            setIncome(incomeData);
        } catch (error) {
            setError('فشل في جلب بيانات الدخل. يرجى المحاولة لاحقًا.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchIncome();
    }, [fetchIncome]);

    const handleDelete = (id) => {
        setDeleteId(id);
        setIsModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteIncome(deleteId);
            setIncome(income.filter(item => item.id !== deleteId));
            message.success('تم حذف الدخل بنجاح');
        } catch (error) {
            message.error('خطأ في حذف الدخل: ' + error.message);
        } finally {
            setIsModalVisible(false);
            setDeleteId(null);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setDeleteId(null);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <Spin size="default" />
            </div>
        );
    }

    if (error) {
        return <div className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h2 style={{ color: '#333' }}>قائمة الدخل</h2>
            <Link to="/incomes/new">
                <Button type="primary" style={{ marginBottom: '10px' }}>إضافة دخل جديد</Button>
            </Link>
            <List
                bordered
                dataSource={income}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Link to={`/incomes/edit/${item.id}`}>
                                <Button type="link"><EditOutlined /></Button>
                            </Link>,
                            <Button type="link" danger onClick={() => handleDelete(item.id)}>
                                <DeleteOutlined />
                            </Button>
                        ]}
                    >
                        {item.description} - ${item.amount}
                    </List.Item>
                )}
            />
            <Modal
                title="تأكيد الحذف"
                open={isModalVisible}
                onOk={confirmDelete}
                onCancel={handleCancel}
            >
                <p>هل أنت متأكد أنك تريد حذف هذا الدخل؟</p>
            </Modal>
        </div>
    );
};

export default IncomeList;
