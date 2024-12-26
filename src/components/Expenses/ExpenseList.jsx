import React, { useEffect, useState } from 'react';
import { getExpenses } from '@/api/index'; // تأكد من وجود دالة getExpenses في api.js

const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const expensesData = await getExpenses();
                setExpenses(expensesData);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Expense List</h2>
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.title} - {expense.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;

