// FloatingButton.js
import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FloatingButton = ({ onClick, menuItems }) => {
    const [visible, setVisible] = useState(false);

    const handleMenuClick = (key) => {
        setVisible(false);
        if (menuItems[key].onClick) {
            menuItems[key].onClick();
        }
    };

    const menu = (
        <Menu>
            {menuItems.map((item, index) => (
                <Menu.Item key={index} onClick={() => handleMenuClick(index)}>
                    {item.icon} {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} onVisibleChange={setVisible} visible={visible}>
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '30px',
                    zIndex: 1000,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                }}
                onClick={onClick}
            />
        </Dropdown>
    );
};

export default FloatingButton;
