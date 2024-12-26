import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // تأكد من تعيين القيمة الأولية إلى مصفوفة فارغة
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // تحميل الفئات عند تحميل المكون
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories'); // استبدل هذا بالرابط الصحيح
        console.log(response.data); // تحقق من البيانات المستلمة
        // تأكد من أن البيانات هي مصفوفة
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('البيانات المستلمة ليست مصفوفة:', response.data);
        }
      } catch (error) {
        console.error('خطأ في تحميل الفئات:', error);
      }
    };

    fetchCategories();
  }, []);

  // تصفية الفئات بناءً على مصطلح البحث
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/categories/${categoryToDelete}`); // استبدل هذا بالرابط الصحيح
      setCategories(categories.filter(category => category.id !== categoryToDelete));
      setDeleteConfirmation(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('خطأ في حذف الفئة:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(false);
    setCategoryToDelete(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="بحث عن الفئات..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCategories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <button onClick={() => handleDelete(category.id)}>حذف</button>
        </div>
      ))}
      {deleteConfirmation && (
        <div>
          <p>هل أنت متأكد أنك تريد حذف هذه الفئة؟</p>
          <button onClick={confirmDelete}>نعم</button>
          <button onClick={cancelDelete}>لا</button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
