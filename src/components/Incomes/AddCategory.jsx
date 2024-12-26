// src/components/AddCategory.js
import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { addIncomeCategory } from '@/api/index';

const AddCategory = ({ visible, onClose, onSuccess }) => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        try {
            await addIncomeCategory({ name });
            message.success('Category added successfully');
            onSuccess();
            onClose();
        } catch (error) {
            message.error('Error adding category');
        }
    };

    return (
        <Modal
            title="Add Income Category"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>,
            ]}
        >
            <Form>
                <Form.Item label="Category Name">
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCategory;
