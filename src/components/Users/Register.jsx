import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استبدال useHistory بـ useNavigate
import { registerUser } from '@/api/index'; // تأكد من وجود دالة registerUser في api.js
import '@/styles/Register.css'; // استيراد ملف الأنماط

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // استخدام useNavigate بدلاً من useHistory

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // تأكد من أن registerUser تتقبل username و password
            await registerUser({ username, password });
            navigate('/login'); // إعادة التوجيه إلى صفحة تسجيل الدخول بعد التسجيل
        } catch (err) {
            // يمكن تحسين معالجة الأخطاء بناءً على محتوى الخطأ
            if (err.response && err.response.data) {
                setError(err.response.data.detail || 'Failed to register. Please try again.');
            } else {
                setError('Failed to register. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
