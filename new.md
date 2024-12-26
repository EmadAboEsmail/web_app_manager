بالطبع! إليك الكود النهائي مع شرح لتفاصيل كل جزء، بالإضافة إلى هيكل المجلدات المناسب لمشروعك.

### هيكل المجلدات المقترح:
```
my-app/
├── src/
│   ├── components/
│   │   ├── MenuItems.js
│   │   └── Navbar.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── store/
│   │   ├── userSlice.js
│   │   └── store.js
│   ├── App.js
│   ├── index.js
│   └── styles/
│       └── App.css
├── package.json
└── ...
```

### 1. **ملف `userSlice.js`:**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        selectedUserId: null, // الحالة الأولية
    },
    reducers: {
        setSelectedUserId(state, action) {
            state.selectedUserId = action.payload; // تعيين معرف المستخدم المحدد
        },
        clearSelectedUserId(state) {
            state.selectedUserId = null; // إعادة تعيين معرف المستخدم
        },
    },
});

// تصدير الدوال
export const { setSelectedUserId, clearSelectedUserId } = userSlice.actions;

export default userSlice.reducer; // تصدير الـ reducer
```

### 2. **ملف `store.js`:**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // استيراد الـ reducer

const store = configureStore({
    reducer: {
        user: userReducer, // إضافة الـ reducer إلى المتجر
    },
});

export default store; // تصدير المتجر
```

### 3. **ملف `Navbar.js`:**
```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Drawer, Button, notification } from 'antd';
import { MenuOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import MenuItems from './MenuItems';
import { useTheme } from '@/context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUserId } from '@/store/userSlice'; // استيراد الدالة من الـ slice

const { Header } = Layout;

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const selectedUserId = useSelector(state => state.user.selectedUserId); // استخدام useSelector للحصول على حالة selectedUserId

    useEffect(() => {
        localStorage.setItem('selectedUserId', selectedUserId || '');
    }, [selectedUserId]);

    useEffect(() => {
        notification.info({
            message: 'تغيير الثيم',
            description: `تم تغيير الثيم إلى ${isDarkMode ? 'داكن' : 'فاتح'}`,
        });
    }, [isDarkMode]);

    const showDrawer = useCallback(() => {
        setOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setOpen(false);
    }, []);

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
```

### 4. **ملف `index.js`:**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // استيراد المتجر
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

### 5. **ملف `MenuItems.js`:**
يمكنك إضافة مكون `MenuItems` حسب الحاجة. إليك مثال بسيط:
```javascript
import React from 'react';

const MenuItems = ({ onClose }) => {
    return (
        <div>
            <h2>قائمة المستخدمين</h2>
            {/* هنا يمكنك إضافة قائمة بالمستخدمين */}
            <button onClick={() => { onClose(); }}>إغلاق</button>
        </div>
    );
};

export default MenuItems;
```

### شرح الهيكل:
- **`components/`:** يحتوي على المكونات الرئيسية مثل `Navbar` و`MenuItems`.
- **`context/`:** يحتوي على سياق الثيم (Theme Context).
- **`store/`:** يحتوي على ملفات Redux مثل `userSlice.js` و`store.js`.
- **`App.js`:** يحتوي على مكون التطبيق الرئيسي.
- **`index.js`:** نقطة الدخول لتطبيق React.

بهذا الشكل، يكون لديك تطبيق React منظم باستخدام Redux لإدارة الحالة. يمكنك توسيع هذا الهيكل حسب احتياجات مشروعك. إذا كان لديك أي أسئلة إضافية، فلا تتردد في طرحها!أكد من اختبار جميع الميزات الجديدة للتحقق من أنها تعمل بشكل صحيح. إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة إضافية، فلا تتردد في طرحها!ذا كان لديك أي استفسارات أو تحتاج إلى مزيد من المساعدة، فلا تتردد في طرحها!أكد من أن كل جزء من الكود يعمل بشكل صحيح وأن لديك جميع المكتبات المطلوبة مثبتة. إذا كان لديك أي استفسارات أو تحتاج إلى مزيد من المساعدة، فلا تتردد في طرحها!ذا كان لديك أي أسئلة أو تحتاج إلى مزيد من التوضيح حول أي نقطة، فلا تتردد في طرحها!ذا كان لديك أي استفسارات إضافية أو تحتاج إلى مزيد من التوضيحات، فلا تتردد في طرحها!قة، يمكنك إدارة الفئات، وتحرير المقالات، وحذفها في تطبيق المدونة الخاص بك.
