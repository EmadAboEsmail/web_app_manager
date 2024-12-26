import React, { useEffect, useState, useCallback } from 'react';
import { getUserIncomes, deleteIncome } from '@/api/index'; 
import { Link } from 'react-router-dom'; 
import { Modal, message, Button, Spin } from 'antd'; 

const IncomeList = () => {
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const userId = localStorage.getItem('userId');

    const fetchIncome = useCallback(async () => {
        try {
            const incomeData = await getUserIncomes(userId);
            setIncome(incomeData);
        } catch (error) {
            console.error('Error fetching income:', error);
            setError('Could not fetch income data.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchIncome();
        } else {
            setError('User ID not found in localStorage.');
            setLoading(false);
        }
    }, [fetchIncome, userId]);

    const handleDelete = (id) => {
        setDeleteId(id);
        setIsModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteIncome(deleteId);
            setIncome(income.filter(item => item.id !== deleteId));
            message.success('Income deleted successfully');
        } catch (error) {
            message.error('Error deleting income: ' + error.message);
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
                <Spin size="large" tip="Loading income..." />
            </div>
        ); // استخدام Spin مع تنسيق مناسب
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <h2>Income List</h2>
            <Link to="/incomes/new">
                <Button type="primary" style={{ marginBottom: '10px' }}>Add New Income</Button>
            </Link>
            <ul>
                {income.map(item => (
                    <li key={item.id} style={{ marginBottom: '10px' }}>
                        {item.source} - ${item.amount}
                        <Link to={`/incomes/edit/${item.id}`}>
                            <Button type="link">Edit</Button>
                        </Link>
                        <Button type="link" danger onClick={() => handleDelete(item.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
            <Modal
                title="Confirm Delete"
                visible={isModalVisible}
                onOk={confirmDelete}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this income?</p>
            </Modal>
        </div>
    );
};

export default IncomeList;
