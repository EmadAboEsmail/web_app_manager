// MenuItems.jsx
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuItems = ({ onClose }) => {
    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: "1",
        },
        {
            label: <Link to="/users">Users</Link>,
            key: "2",
        },
        {
            label: <Link to="/expenses">Expenses</Link>,
            key: "3",
        },
        {
            label: <Link to="/articles">Articles</Link>,
            key: "4",
        },
        {
            label: <Link to="/categories">Categories</Link>,
            key: "5",
        },
        {
            label: <Link to="/incomes">incomes</Link>,
            key: "6",
        },
        

    ];

    return (
        <Menu mode="inline" items={items} onClick={onClose} />
    );
};

export default MenuItems;
