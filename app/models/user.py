### 2. `/models/user.py`
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    articles = relationship("Article", back_populates="owner")
    incomes = relationship("Income", back_populates="owner")
    expenses = relationship("Expense", back_populates="owner")

