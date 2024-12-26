### 10. `/schemas/income.py`
from pydantic import BaseModel
from datetime import date  # استيراد نوع التاريخ

class IncomeBase(BaseModel):
    amount: int  # المبلغ (عدد صحيح)
    description: str  # وصف الدخل (سلسلة نصية)
    category_id: int  # معرف الفئة (عدد صحيح)
    date: date  # تاريخ الدخل

class IncomeCreate(IncomeBase):
    
    owner_id: int  # معرف المالك (عدد صحيح)
 # يمكن إضافة قيود أو خصائص إضافية عند الحاجة

class IncomeUpdate(IncomeBase):
    pass  # يمكن إضافة قيود أو خصائص إضافية عند الحاجة

class Income(IncomeBase):
    id: int  # معرف الدخل (عدد صحيح)
    owner_id: int  # معرف المالك (عدد صحيح)

    class Config:
        orm_mode = True  # تفعيل وضع ORM لتسهيل تحويل النماذج إلى كائنات SQLAlchemy
        schema_extra = {
            "example": {
                "amount": 0,
                "description": "string",
                "category_id": 0,
                "date": "2024-12-24",
                "id": 0,
                "owner_id": 0
            }
        }
