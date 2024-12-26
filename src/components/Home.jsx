import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/api/index'; // تأكد من وجود الدوال المناسبة في api.js
import 'antd/dist/antd'; // استيراد أنماط Ant Design

const { Option } = Select;

const Home = () => {
    const [users, setUsers] = useState([]); // قائمة المستخدمين
    const [selectedUserId, setSelectedUserId] = useState(() => {
        // استرجاع معرف المستخدم المحدد من localStorage
        return localStorage.getItem('selectedUserId') || null;
    }); 
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [isEditing, setIsEditing] = useState(false); // حالة تعديل المستخدم
    const [form] = Form.useForm(); // استخدام Form من Ant Design

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const allUsers = await getAllUsers(); // جلب جميع المستخدمين
                setUsers(allUsers);
            } catch (err) {
                message.error('Failed to load users: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            const user = users.find(user => user.id === selectedUserId); // العثور على المستخدم المحدد
            if (user) {
                // إعداد النموذج مع بيانات المستخدم
                form.setFieldsValue({
                    username: user.username,
                    password: '', // إعادة تعيين كلمة المرور
                });
                setIsEditing(true);
            } else {
                setIsEditing(false);
            }
        }
    }, [selectedUserId, users, form]);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId); // تخزين معرف المستخدم في localStorage
    };

    const handleSubmit = async (values) => {
        try {
            if (isEditing) {
                await updateUser(selectedUserId, values);
                message.success('User updated successfully');
            } else {
                await createUser(values);
                message.success('User added successfully');
            }
            // تحديث قائمة المستخدمين
            const allUsers = await getAllUsers();
            setUsers(allUsers);
            form.resetFields(); // إعادة تعيين النموذج
            setSelectedUserId(null);
            setIsEditing(false);
            localStorage.removeItem('selectedUserId'); // إزالة معرف المستخدم من localStorage
        } catch (err) {
            message.error('Failed to save user: ' + err.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) { // تأكيد قبل الحذف
            try {
                await deleteUser(userId); // استدعاء دالة حذف المستخدم
                message.success('User deleted successfully');
                const allUsers = await getAllUsers(); // تحديث القائمة
                setUsers(allUsers);
                form.resetFields(); // إعادة تعيين النموذج
                setSelectedUserId(null);
                setIsEditing(false);
                localStorage.removeItem('selectedUserId'); // إزالة معرف المستخدم من localStorage
            } catch (err) {
                message.error('Failed to delete user: ' + err.message);
            }
        }
    };

    if (loading) {
        return <Spin size="large" />; // عرض حالة التحميل
    }

    // العثور على المستخدم المحدد
    const selectedUser = users.find(user => user.id === selectedUserId);

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Management</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: !isEditing, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isEditing ? 'Update User' : 'Add User'}
                    </Button>
                </Form.Item>
            </Form>

            <h3>Select a User to Edit or Delete</h3>
            <Select
                style={{ width: '100%', marginBottom: '20px' }}
                placeholder="Select a user"
                onChange={handleUserSelect}
                value={selectedUserId || undefined}
            >
                {users.map((user) => (
                    <Option key={user.id} value={user.id}>
                        {user.username}
                    </Option>
                ))}
            </Select>

            {isEditing && (
                <Button type="danger" onClick={() => handleDeleteUser(selectedUserId)}>
                    Delete User
                </Button>
            )}

            {/* عرض معلومات المستخدم المحدد */}
            {selectedUser && (
                <div style={{ marginTop: '20px' }}>
                    <h3>User Details:</h3>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>User ID:</strong> {selectedUser.id}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
