// Home.js
import React, { useEffect, useState, useCallback } from 'react';
import { notification, Spin, Select, Button, Modal, Avatar, Card, Row, Col } from 'antd';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/api/index';
import UserForm from '@/components/Users/UserForm';
import FloatingButton from '@/components/Users/FloatingButton';
import { DollarOutlined, UserAddOutlined, CreditCardOutlined, DeleteOutlined, ReadOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(localStorage.getItem('selectedUserId') || null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const allUsers = await getAllUsers();
            setUsers(allUsers);
        } catch (err) {
            notification.error({
                message: 'خطأ',
                description: `فشل في تحميل المستخدمين: ${err.message}`,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId);
        setIsEditing(users.some(user => user.id === userId));

        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
    };

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await updateUser(selectedUserId, values);
                notification.success({ message: 'نجاح', description: 'تم تحديث المستخدم بنجاح' });
            } else {
                await createUser(values);
                notification.success({ message: 'نجاح', description: 'تم إضافة مستخدم بنجاح' });
            }
            await fetchAllUsers();
            setShowForm(false);
            localStorage.removeItem('selectedUserId');
        } catch (err) {
            notification.error({
                message: 'خطأ',
                description: `فشل في حفظ المستخدم: ${err.message}`,
            });
        }
    };

    const handleDeleteUser = () => {
        Modal.confirm({
            title: 'تأكيد الحذف',
            content: 'هل أنت متأكد أنك تريد حذف هذا المستخدم؟',
            onOk: async () => {
                try {
                    await deleteUser(selectedUserId);
                    notification.success({ message: 'نجاح', description: 'تم حذف المستخدم بنجاح' });
                    await fetchAllUsers();
                    setSelectedUserId(null);
                    setSelectedUser(null);
                    localStorage.removeItem('selectedUserId');
                } catch (err) {
                    notification.error({
                        message: 'خطأ',
                        description: `فشل في حذف المستخدم: ${err.message}`,
                    });
                }
            },
        });
    };

    if (loading) {
        return <Spin size="large" />;
    }

    const menuItems = [
        { label: 'incomes', icon: <DollarOutlined />, onClick: () => navigate('/incomes') },
        { label: 'expenses', icon: <CreditCardOutlined />, onClick: () => navigate('/expenses') },
        { label: 'articles', icon: <ReadOutlined />, onClick: () => navigate('/articles') },
        { label: 'adduser', icon: <UserAddOutlined />, onClick: () => { setIsEditing(false); setShowForm(true); } },
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', direction: 'rtl' }}>
            <header style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h1 style={{ color: '#333', fontSize: '2rem' }}>إدارة المستخدمين</h1>
            </header>

            {!selectedUserId ? (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Select
                        style={{ flex: 1, marginRight: '10px' }}
                        placeholder="اختر مستخدمًا"
                        onChange={handleUserSelect}
                        value={selectedUserId || undefined}
                    >
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>
                                {user.username}
                            </Option>
                        ))}
                    </Select>

                    {isEditing && (
                        <Button type="default" danger onClick={handleDeleteUser}>
                            <DeleteOutlined /> حذف
                        </Button>
                    )}
                </div>
            ) : (
                <Card style={{ marginBottom: '20px', padding: '20px' }}>
                    <Row align="middle" gutter={16}>
                        <Col span={6}>
                            {selectedUser && <Avatar size={64} src={selectedUser.avatarUrl} />}
                        </Col>
                        <Col span={14}>
                            {selectedUser && <h2 style={{ margin: 0 }}>{selectedUser.username}</h2>}
                        </Col>
                        <Col span={4}>
                            <Button 
                                type="default" 
                                onClick={() => { 
                                    setSelectedUserId(null); 
                                    setSelectedUser(null); 
                                }} 
                                style={{ width: '100%' }}
                            >
                                X
                            </Button>
                        </Col>
                    </Row>
                </Card>
            )}

            <UserForm 
                visible={showForm} 
                onCreate={handleSubmit} 
                onCancel={() => setShowForm(false)} 
            />

            <FloatingButton onClick={() => setShowLinks(!showLinks)} menuItems={menuItems} />
        </div>
    );
};

export default Home;
