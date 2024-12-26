#### 17. `/routers/incomes.py`
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import income as models
from app.schemas import income as schemas

router = APIRouter()

@router.post("/incomes/", response_model=schemas.Income)
def create_income(income: schemas.IncomeCreate, db: Session = Depends(get_db)):
    """
    Create a new income entry.

    Args:
        income (schemas.IncomeCreate): The income information to be created.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        schemas.Income: The created income entry.
    """
    db_income = models.Income(**income.dict())
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@router.get("/users/{user_id}/incomes/", response_model=list[schemas.Income])
def get_user_incomes(user_id: int, db: Session = Depends(get_db)):
    """
    Get all income entries for a specific user.

    Args:
        user_id (int): The ID of the user whose incomes are to be retrieved.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        list[schemas.Income]: A list of income entries for the specified user.
    """
    incomes = db.query(models.Income).filter(models.Income.owner_id == user_id).all()
    return incomes

@router.get("/incomes/", response_model=list[schemas.Income])
def read_incomes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a list of income entries with pagination.

    Args:
        skip (int, optional): The number of records to skip. Defaults to 0.
        limit (int, optional): The maximum number of records to return. Defaults to 10.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        list[schemas.Income]: A list of income entries.
    """
    return db.query(models.Income).offset(skip).limit(limit).all()

@router.put("/incomes/{income_id}", response_model=schemas.Income)
def update_income(income_id: int, income: schemas.IncomeUpdate, db: Session = Depends(get_db)):
    """
    Update an existing income entry.

    Args:
        income_id (int): The ID of the income entry to be updated.
        income (schemas.IncomeUpdate): The updated income information.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        schemas.Income: The updated income entry.

    Raises:
        HTTPException: If the income entry is not found.
    """
    db_income = db.query(models.Income).filter(models.Income.id == income_id).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")

    # Update the existing properties
    for key, value in income.dict(exclude_unset=True).items():
        setattr(db_income, key, value)

    try:
        db.commit()
        db.refresh(db_income)
    except Exception:
        raise HTTPException(status_code=500, detail="Error updating income")
    
    return db_income

@router.delete("/incomes/{income_id}", response_model=schemas.Income)
def delete_income(income_id: int, db: Session = Depends(get_db)):
    """
    Delete an existing income entry.

    Args:
        income_id (int): The ID of the income entry to be deleted.
        db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        schemas.Income: The deleted income entry.

    Raises:
        HTTPException: If the income entry is not found or if an error occurs during deletion.
    """
    db_income = db.query(models.Income).filter(models.Income.id == income_id).first()
    if not db_income:
        raise HTTPException(status_code=404, detail="Income not found")
    
    db.delete(db_income)
    try:
        db.commit()
    except Exception:
        raise HTTPException(status_code=500, detail="Error deleting income")
    
    return db_income
