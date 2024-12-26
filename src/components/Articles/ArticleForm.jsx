import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, message } from 'antd';

const ArticleForm = ({ articleId }) => {
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // إذا كان لديك articleId، قم بتحميل المقالة للتحرير
  useEffect(() => {
    if (articleId) {
      setIsEditMode(true);
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`/api/articles/${articleId}`); // استبدل هذا بالرابط الصحيح
          setArticle(response.data);
        } catch (error) {
          console.error('خطأ في تحميل المقالة:', error);
        }
      };

      fetchArticle();
    }
  }, [articleId]);

  const handleSubmit = async (values) => {
    try {
      if (isEditMode) {
        // تحديث المقالة
        await axios.put(`/api/articles/${articleId}`, values); // استبدل هذا بالرابط الصحيح
        message.success('تم تحديث المقالة بنجاح!');
      } else {
        // إضافة المقالة الجديدة
        await axios.post('/api/articles', values); // استبدل هذا بالرابط الصحيح
        message.success('تم إضافة المقالة بنجاح!');
      }
      // إعادة تعيين النموذج
      setArticle({ title: '', content: '' });
    } catch (error) {
      console.error('خطأ في حفظ المقالة:', error);
      message.error('حدث خطأ أثناء حفظ المقالة.');
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'تعديل المقالة' : 'إضافة مقالة جديدة'}</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={article}
      >
        <Form.Item
          label="عنوان المقالة"
          name="title"
          rules={[{ required: true, message: 'الرجاء إدخال عنوان المقالة!' }]}
        >
          <Input
            value={article.title}
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="محتوى المقالة"
          name="content"
          rules={[{ required: true, message: 'الرجاء إدخال محتوى المقالة!' }]}
        >
          <Input.TextArea
            value={article.content}
            onChange={(e) => setArticle({ ...article, content: e.target.value })}
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditMode ? 'تحديث المقالة' : 'إضافة المقالة'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleForm;
