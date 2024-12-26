#### 20. `/routers/income_categories.py`
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas import income_categories as schemas
from app.models import income_categories as models
import logging

# إعداد الروتر
router = APIRouter()

# إعداد تسجيل الأخطاء
logger = logging.getLogger(__name__)

@router.post("/income_categories/", response_model=schemas.IncomeCategory)
def create_income_category(category: schemas.IncomeCategoryCreate, db: Session = Depends(get_db)):
    """
    Create a new income category.

    - **category**: An object containing the data for the new income category.
    - **db**: The database session used to interact with the database.

    **Returns**: The object representing the created income category.

    **Raises**:
    - HTTPException: If an error occurs while creating the income category.
    """
    try:
        db_category = models.IncomeCategory(**category.dict())
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    except Exception as e:
        logger.error("Error creating income category: %s", str(e))
        raise HTTPException(status_code=500, detail="Error creating income category")

@router.get("/income_categories/", response_model=list[schemas.IncomeCategory])
def read_income_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a list of income categories with pagination.

    - **skip**: The number of categories to skip.
    - **limit**: The maximum number of categories to retrieve.

    **Returns**: A list of income categories.
    """
    return db.query(models.IncomeCategory).offset(skip).limit(limit).all()

@router.put("/income_categories/{category_id}", response_model=schemas.IncomeCategory)
def update_income_category(category_id: int, category: schemas.IncomeCategoryUpdate, db: Session = Depends(get_db)):
    """
    Update an existing income category.

    - **category_id**: The ID of the income category to update.
    - **category**: An object containing the new data for the income category.
    - **db**: The database session used to interact with the database.

    **Returns**: The object representing the updated income category.

    **Raises**:
    - HTTPException: If the income category is not found or if an error occurs during the update.
    """
    db_category = db.query(models.IncomeCategory).filter(models.IncomeCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Income category not found")

    # Update the existing properties
    for key, value in category.dict(exclude_unset=True).items():
        setattr(db_category, key, value)

    try:
        db.commit()  # Save changes to the database
        db.refresh(db_category)  # Refresh the object to reflect new values
    except Exception as e:
        logger.error("Error updating income category: %s", str(e))
        raise HTTPException(status_code=500, detail="Error updating income category")
    
    return db_category

@router.delete("/income_categories/{category_id}", response_model=schemas.IncomeCategory)
def delete_income_category(category_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific income category.

    - **category_id**: The ID of the income category to delete.
    - **db**: The database session used to interact with the database.

    **Returns**: The object representing the deleted income category.

    **Raises**:
    - HTTPException: If the income category is not found or if an error occurs during deletion.
    """
    db_category = db.query(models.IncomeCategory).filter(models.IncomeCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Income category not found")
    
    db.delete(db_category)  # Delete the object
    try:
        db.commit()  # Save changes to the database
    except Exception as e:
        logger.error("Error deleting income category: %s", str(e))
        raise HTTPException(status_code=500, detail="Error deleting income category")
    
    return db_category
