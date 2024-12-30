import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // تأكد من وجود مكون Navbar
import Home from './components/Home'; // تأكد من وجود مكون Home
// import UserList from './components/Users/UserList'; // تأكد من وجود مكون UserList
import ExpenseList from './components/Expenses/ExpenseList'; // تأكد من وجود مكون ExpenseList
import ArticleList from './components/Articles/ArticleList'; // تأكد من وجود مكون ArticleList
import ArticleForm from './components/Articles/ArticleForm'; // تأكد من وجود مكون ArticleForm
import CategoryForm from './components/Categories/CategoryForm'; // تأكد من وجود مكون CategoryForm
import CategoryList from './components/Categories/CategoryList'; // تأكد من وجود مكون CategoryList
// import Login from './components/Users/Login'; // تأكد من وجود مكون Login
// import Register from './components/Users/Register'; // تأكد من وجود مكون Register
// import Profile from './components/Users/Profile'; // تأكد من وجود مكون Profile
import EditIncome from './components/Incomes/EditIncome'; // تأكد من المسار الصحيح
import IncomeList from './components/Incomes/IncomeList';
import AddIncome from './components/Incomes/AddIncome';
import IncomeCategories from './components/Incomes/IncomeCategories';
import { UserProvider } from './context/UserContext';
import UserForm from './components/Users/UserForm';

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/add" element={<UserForm />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/new" element={<ArticleForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/incomes" element={<IncomeList />} />
        <Route path="/incomes/new" element={<AddIncome />} />
        <Route path="/incomes/edit/:id" element={<EditIncome />} /> {/* المسار لتعديل الدخل */}
        <Route path="/incomes/categories" element={<IncomeCategories />} />
        {/* يمكنك إضافة المزيد من الصفحات هنا */}
      </Routes>
    </UserProvider>
  );
}

export default App;
