import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/index'; 
import '@/styles/Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await loginUser(username, password);
            navigate('/profile'); // الانتقال إلى صفحة الملف الشخصي بعد تسجيل الدخول
        } catch (err) {
            setError(err.message); // تعيين رسالة الخطأ
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>تسجيل الدخول</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="اسم المستخدم" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="كلمة المرور" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
            </form>
        </div>
    );
};

export default Login;

