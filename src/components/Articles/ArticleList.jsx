import React, { useEffect, useState } from 'react';
import { getArticles } from '@/api/index'; // تأكد من وجود دالة getArticles في api.js

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h2>Article List</h2>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>
                        {article.title} - {article.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;

