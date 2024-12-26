#### 22. `/routers/article_categories.py`
from app import models
from app.schemas import article_categories
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models import article_categories as models
from app.schemas import article_categories as schemas
router = APIRouter()

@router.post("/article_categories/", response_model=schemas.ArticleCategory)
def create_article_category(category: schemas.ArticleCategoryCreate, db: Session = Depends(get_db)):

    db_category = models.ArticleCategory(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/article_categories/", response_model=list[schemas.ArticleCategory])
def read_article_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.ArticleCategory).offset(skip).limit(limit).all()

@router.delete("/article_categories/{category_id}", response_model=schemas.ArticleCategory)
def delete_article_category(category_id: int, db: Session = Depends(get_db)):
    db_category = db.query(models.ArticleCategory).filter(models.ArticleCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    db.delete(db_category)
    db.commit()
    return db_category

@router.put("/article_categories/{category_id}", response_model=schemas.ArticleCategory)
def update_article_category(category_id: int, category: schemas.ArticleCategoryUpdate, db: Session = Depends(get_db)):
    db_category = db.query(models.ArticleCategory).filter(models.ArticleCategory.id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")

    # تحديث الخصائص الموجودة
    for key, value in category.dict(exclude_unset=True).items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category
