import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/categories/', {
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اسم الفئة"
        required
      />
      <button type="submit">إضافة فئة</button>
    </form>
  );
};

export default CategoryForm;

