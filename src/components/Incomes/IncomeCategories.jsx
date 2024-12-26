// src/components/IncomeCategories.js
import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import { fetchIncomeCategories, deleteIncomeCategory } from '@/api/index';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

const IncomeCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await fetchIncomeCategories();
            setCategories(data);
        } catch (error) {
            message.error('Error fetching categories');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIncomeCategory(id);
            message.success('Category deleted successfully');
            loadCategories();
        } catch (error) {
            message.error('Error deleting category');
        }
    };

    const handleEdit = (category) => {
        setEditCategory(category);
        setIsEditModalVisible(true);
    };

    const handleAdd = () => {
        setIsAddModalVisible(true);
    };

    return (
        <div>
            <Button type="primary" onClick={handleAdd}>
                Add Category
            </Button>
            <Table
                dataSource={categories}
                rowKey="id"
                columns={[
                    { title: 'ID', dataIndex: 'id', key: 'id' },
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                            <>
                                <Button onClick={() => handleEdit(record)}>Edit</Button>
                                <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                            </>
                        ),
                    },
                ]}
            />
            <AddCategory
                visible={isAddModalVisible}
                onClose={() => setIsAddModalVisible(false)}
                onSuccess={loadCategories}
            />
            <EditCategory
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                category={editCategory}
                onSuccess={loadCategories}
            />
        </div>
    );
};

export default IncomeCategories;
