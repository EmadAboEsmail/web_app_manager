// UserForm.js
import React from 'react';
import { Form, Input, Modal } from 'antd';

const UserForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title="إضافة / تعديل مستخدم"
            okText="حفظ"
            cancelText="إلغاء"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => console.log('Validate Failed:', info));
            }}
            centered
            bodyStyle={{ padding: '20px' }} // تحسين الحشو
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="username"
                    label="اسم المستخدم"
                    rules={[{ required: true, message: 'يرجى إدخال اسم المستخدم!' }]}
                >
                    <Input placeholder="أدخل اسم المستخدم" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="كلمة المرور"
                    rules={[{ required: true, message: 'يرجى إدخال كلمة المرور!' }]}
                >
                    <Input.Password placeholder="أدخل كلمة المرور" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserForm;
