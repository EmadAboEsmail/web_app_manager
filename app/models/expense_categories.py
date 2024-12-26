#### 7. `/models/expense_categories.py`
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class ExpenseCategory(Base):
    __tablename__ = "expense_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    expenses = relationship("Expense", back_populates="category")  # تأكد من أن العلاقة هنا صحيحة
