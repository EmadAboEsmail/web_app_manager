import React, { useEffect, useState } from 'react';
import { getUserProfile, getAllUsers, loginUser } from '@/api/index';
import '@/styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null); // حالة المستخدم الحالي
    const [users, setUsers] = useState([]); // قائمة المستخدمين
    const [selectedUserId, setSelectedUserId] = useState(null); // معرف المستخدم المحدد
    const [selectedUser, setSelectedUser] = useState(null); // حالة المستخدم المحدد
    const [error, setError] = useState(null); // حالة الخطأ
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [password, setPassword] = useState(''); // حالة كلمة المرور
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // حالة عرض مربع الحوار

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token) {
                setError('You need to log in first.');
                setLoading(false);
                return;
            }
            if (!userId) {
                setError('User ID not found.');
                setLoading(false);
                return;
            }

            try {
                const userData = await getUserProfile(userId);
                setUser(userData);

                const allUsers = await getAllUsers();
                setUsers(allUsers);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUserSelect = (event) => {
        const userId = event.target.value; // الحصول على معرف المستخدم المحدد
        setSelectedUserId(userId);

        if (userId) {
            setShowPasswordPrompt(true); // فتح مربع الحوار لإدخال كلمة المرور
        } else {
            setSelectedUser(null); // إذا لم يتم اختيار مستخدم، قم بتعيين الحالة إلى null
        }
    };

    const handleLogin = async () => {
        try {
            // تسجيل خروج المستخدم الحالي
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            // جلب معلومات المستخدم المحدد
            const userData = await getUserProfile(selectedUserId); // استخدام معرف المستخدم المحدد
            
            // تسجيل دخول المستخدم المحدد
            const loginData = {
                username: userData.username, // تأكد من أن هذا هو اسم المستخدم الصحيح
                password: password, // استخدم كلمة المرور المدخلة
            };

            const loginResponse = await loginUser(loginData); // دالة تسجيل الدخول
            localStorage.setItem('token', loginResponse.access_token);
            localStorage.setItem('userId', loginResponse.user_id);

            // تحديث حالة المستخدم
            setUser(userData);
            setSelectedUser(userData);
            setShowPasswordPrompt(false); // أغلق مربع الحوار
            setPassword(''); // إعادة تعيين كلمة المرور المدخلة
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>ID: {user.id}</p>

            <h3>Select Another User</h3>
            <select onChange={handleUserSelect} value={selectedUserId || ''}>
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </select>

            {/* مربع الحوار لإدخال كلمة المرور */}
            {showPasswordPrompt && (
                <div className="password-prompt">
                    <h3>Enter Password for {selectedUserId}</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
                </div>
            )}

            {selectedUser && (
                <div>
                    <h3>Selected User Details</h3>
                    <p>Username: {selectedUser.username}</p>
                    <p>ID: {selectedUser.id}</p>
                </div>
            )}

            <h3>Manage Your Information</h3>
            <ul>
                <li>
                    <Link to="/expenses">View Expenses</Link>
                </li>
                <li>
                    <Link to="/incomes">View Incomes</Link>
                </li>
                <li>
                    <Link to="/articles">View Articles</Link>
                </li>
            </ul>
        </div>
    );
};

export default Profile;
