#### 11. `/schemas/expense.py`
from pydantic import BaseModel

class ExpenseBase(BaseModel):
    amount: int
    description: str
    category_id: int

class ExpenseCreate(ExpenseBase):
    pass
class ExpenseUpdate(ExpenseBase):
    pass


class Expense(ExpenseBase):
    id: int
    owner_id: int

    class Config:
        rom_attributes = True


