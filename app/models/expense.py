#### 4. `/models/expense.py`
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Integer)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("expense_categories.id"))

    owner = relationship("User", back_populates="expenses")
    category = relationship("ExpenseCategory", back_populates="expenses")  # إضافة علاقة category هنا
