#### 13. `/schemas/income_categories.py`
from pydantic import BaseModel

class IncomeCategoryBase(BaseModel):
    name: str

class IncomeCategoryCreate(IncomeCategoryBase):
    pass

class IncomeCategoryUpdate(IncomeCategoryBase):
    pass

class IncomeCategory(IncomeCategoryBase):
    id: int

    class Config:
        from_attributes = True


