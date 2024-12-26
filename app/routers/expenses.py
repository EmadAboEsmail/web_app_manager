#### 18. `/routers/expenses.py`
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models import expense as models
from app.schemas import expense as schemas
from app.database.database import get_db
router = APIRouter()


@router.post("/expenses/", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense
@router.get("/users/{user_id}/expenses/", response_model=list[schemas.Expense])
def get_user_expenses(user_id: int, db: Session = Depends(get_db)):
    expenses = db.query(models.Expense).filter(models.Expense.owner_id == user_id).all()
    return expenses

@router.get("/expenses/", response_model=list[schemas.Expense])
def read_expenses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Expense).offset(skip).limit(limit).all()

@router.put("/expenses/{expense_id}", response_model=schemas.Expense)
def update_expense(expense_id: int, expense: schemas.ExpenseUpdate, db: Session = Depends(get_db)):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    # تحديث الخصائص الموجودة
    for key, value in expense.dict(exclude_unset=True).items():
        setattr(db_expense, key, value)

    try:
        db.commit()
        db.refresh(db_expense)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error updating expense")
    
    return db_expense

@router.delete("/expenses/{expense_id}", response_model=schemas.Expense)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    db_expense = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    db.delete(db_expense)
    try:
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error deleting expense")
    
    return db_expense
