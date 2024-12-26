from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.schemas import  expense_categories as  schemas
from app.models import expense_categories as models
from app.database.database import get_db
router = APIRouter()

@router.post("/expense_categories/", response_model=schemas.ExpenseCategory)
def create_expense_category(category: schemas.ExpenseCategoryCreate, db: Session = Depends(get_db)):
    db_category = models.ExpenseCategory(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/expense_categories/", response_model=list[schemas.ExpenseCategory])
def read_expense_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.ExpenseCategory).offset(skip).limit(limit).all()

@router.put("/expense_categories/{category_id}", response_model=schemas.ExpenseCategory)
def update_expense_category(category_id: int, category: schemas.ExpenseCategoryUpdate, db: Session = Depends(get_db)):
    db_category = db.query(models.ExpenseCategory).filter(models.ExpenseCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")

    # تحديث الخصائص الموجودة
    for key, value in category.dict(exclude_unset=True).items():
        setattr(db_category, key, value)

    try:
        db.commit()
        db.refresh(db_category)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error updating category")
    
    return db_category

@router.delete("/expense_categories/{category_id}", response_model=schemas.ExpenseCategory)
def delete_expense_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(models.ExpenseCategory).filter(models.ExpenseCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(db_category)
    try:
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error deleting category")
    
    return db_category
