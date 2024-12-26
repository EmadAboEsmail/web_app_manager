#### 6. `/models/income_categories.py`

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class IncomeCategory(Base):
    __tablename__ = "income_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    incomes = relationship("Income", back_populates="category")  # تأكد من أن العلاقة هنا صحيحة

