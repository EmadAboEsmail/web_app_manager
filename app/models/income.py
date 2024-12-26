from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.database.database import Base

class Income(Base):
    __tablename__ = "incomes"  # اسم الجدول في قاعدة البيانات

    id = Column(Integer, primary_key=True, index=True)  # معرف الدخل، مفتاح رئيسي
    amount = Column(Integer, nullable=False)  # المبلغ
    description = Column(String)  # وصف الدخل
    date = Column(Date, nullable=False)  # تاريخ الدخل
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # معرف المالك (المستخدم)
    category_id = Column(Integer, ForeignKey("income_categories.id"), nullable=True)  # معرف الفئة

    # علاقات
    owner = relationship("User", back_populates="incomes")  # علاقة مع نموذج المستخدم
    category = relationship("IncomeCategory", back_populates="incomes")  # علاقة مع نموذج فئة الدخل
