import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css'; // استيراد أنماط Ant Design
import '@/styles/themes.css'
import { ThemeProvider } from './context/ThemeContext'; // استيراد موفر الموضوع
import { AppProvider } from './context/AppText';
import { Provider } from 'react-redux';
import store from './store/store';

const rootElement = document.getElementById('root'); // تحديد العنصر الجذري
const root = ReactDOM.createRoot(rootElement); // إنشاء الجذر للتطبيق

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AppProvider>
                    <Provider store={store}>

                   <App /> {/* تطبيق المكونات داخل موفر الموضوع وموجه المتصفح */}
                   </Provider>
                </AppProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
