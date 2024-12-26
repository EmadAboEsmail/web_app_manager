// src/components/EditCategory.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { updateIncomeCategory} from '@/api/index'

const EditCategory = ({ visible, onClose, category, onSuccess }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    const handleSubmit = async () => {
        try {
            await updateIncomeCategory(category.id, { name });
            message.success('Category updated successfully');
            onSuccess();
            onClose();
        } catch (error) {
            message.error('Error updating category');
        }
    };

    return (
        <Modal
            title="Edit Income Category"
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

export default EditCategory;
