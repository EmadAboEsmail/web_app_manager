import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Drawer, Button, notification, Popover } from 'antd';
import { MenuOutlined, SunOutlined, MoonOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import MenuItems from './MenuItems';
import { useTheme } from '@/context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setSelectedUserId } from '@/store/userSlice'; // استيراد الدالة من الـ slice
import { getUserById } from '@/api/index';

const { Header } = Layout;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const [selectedUserId, setSelectedUserId] = useState(() => {
        // استرجاع معرف المستخدم المحدد من localStorage
        return localStorage.getItem('selectedUserId') || null;
    });
    const [userInfo, setUserInfo] = useState({ username: '', userId: selectedUserId || "غير معروف" });

    useEffect(() => {
        const fetchUser = async () => {
            if (selectedUserId) {
                try {
                    const user = await getUserById(selectedUserId - 1); // استدعاء الدالة للحصول على المستخدم
                    if (user) {
                        setUserInfo({ username: user.username, userId: user.id });
                    } else {
                        console.log('User not found');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        
        fetchUser(); // استدعاء الدالة
    }, [selectedUserId]);

    useEffect(() => {
        localStorage.setItem('selectedUserId', selectedUserId || '');
    }, [selectedUserId]);

    
    const showDrawer = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleLogout = () => {
        dispatch(setSelectedUserId(null)); // تعيين selectedUserId إلى null
        notification.success({
            message: 'تم تسجيل الخروج',
            description: 'لقد قمت بتسجيل الخروج بنجاح.',
        });
        setUserInfo({ username: '', userId: "غير معروف" }); // إعادة تعيين معلومات المستخدم
    };

    const handleLogin = () => {
        // هنا يمكنك إضافة منطق تسجيل الدخول الخاص بك
        console.log('تسجيل الدخول');
    };

    const userPopoverContent = (
        <div>
            <p>اسم المستخدم: {userInfo.username || "غير معروف"}</p>
            <p>معرف المستخدم: {userInfo.userId}</p>
            {selectedUserId ? (
                <Button type="link" onClick={handleLogout} icon={<LogoutOutlined />}>
                    تسجيل الخروج
                </Button>
            ) : (
                <Button type="link" onClick={handleLogin} icon={<LoginOutlined />}>
                    تسجيل الدخول
                </Button>
            )}
        </div>
    );

    return (
        <Layout>
            <Header className="navbar" style={{ display: 'flex', alignItems: 'center', backgroundColor: isDarkMode ? '#001529' : '#ffffff' }}>
                <div className="logo">
                    <h1 style={{ margin: 0, color: isDarkMode ? 'white' : 'black' }}>MyApp</h1>
                </div>
                <Button 
                    className="theme-button"
                    type="default"
                    onClick={toggleTheme}
                    icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                    style={{ marginLeft: '16px' }}
                    aria-label="Toggle theme"
                />
                <Button 
                    className="menu-button"
                    type="primary" 
                    onClick={showDrawer}
                    icon={<MenuOutlined />}
                    style={{ marginInlineStart: 1 }}
                    aria-label="Open menu"
                />
                <Popover content={userPopoverContent} trigger="click">
                    <Button 
                        className="user-button" 
                        icon={<UserOutlined />} 
                        style={{ marginInlineStart: 16 }}
                        aria-label="User Info"
                    />
                </Popover>
                <Drawer
                    title="Menu"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    open={open}
                >
                    <MenuItems onClose={onClose} />
                </Drawer>
            </Header>
        </Layout>
    );
};

export default Navbar;
