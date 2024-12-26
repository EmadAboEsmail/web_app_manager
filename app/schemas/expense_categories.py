#### 14. `/schemas/expense_categories.py`
from pydantic import BaseModel

class ExpenseCategoryBase(BaseModel):
    name: str
class ExpenseCategoryUpdate(ExpenseCategoryBase):
    pass


class ExpenseCategoryCreate(ExpenseCategoryBase):
    pass

class ExpenseCategory(ExpenseCategoryBase):
    id: int

    class Config:
        rom_attributes = True


