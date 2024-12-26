import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // تأكد من وجود مكون Navbar
import Home from './components/Home'; // تأكد من وجود مكون Home
import UserList from './components/Users/UserList'; // تأكد من وجود مكون UserList
import ExpenseList from './components/Expenses/ExpenseList'; // تأكد من وجود مكون ExpenseList
import ArticleList from './components/Articles/ArticleList'; // تأكد من وجود مكون ArticleList
import ArticleForm from './components/Articles/ArticleForm'; // تأكد من وجود مكون ArticleForm
import CategoryForm from './components/Categories/CategoryForm'; // تأكد من وجود مكون CategoryForm
import CategoryList from './components/Categories/CategoryList'; // تأكد من وجود مكون CategoryList
import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Profile from './components/Users/Profile'
import EditIncome from './components/Incomes/EditIncome'; // تأكد من المسار الصحيح
import IncomeList from './components/Incomes/IncomeList';
import AddIncome from './components/Incomes/AddIncome';
import IncomeCategories from './components/Incomes/IncomeCategories';
import { UserProvider } from './context/UserContext';





function App() {
  return (
    <>
            <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/incomes/edit/:id" element={<EditIncome />} /> {/* المسار لتعديل الدخل */}

<Route path="/incomes" element={<IncomeList />} /> {/* المسار لتعديل الدخل */}
        <Route path="/incomes/new" element={<AddIncome />} /> {/* المسار لتعديل الدخل */}
        <Route path="/incomes/categories" element={<IncomeCategories />} />
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserList />} />
                {/* يمكنك إضافة المزيد من الصفحات هنا */}
       <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
      </Routes>
      </UserProvider>
    </>
  );
}

export default App;

