from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.article import Article, ArticleCreate
from app.models.article import Article as ArticleModel  # تأكد من أن المسار صحيح
from app.database.database import get_db
router = APIRouter()

@router.post("/articles/", response_model=Article)
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    db_article = ArticleModel(**article.dict())
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

@router.get("/articles/", response_model=list[Article])
def read_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(ArticleModel).offset(skip).limit(limit).all()
@router.get("/users/{user_id}/articles/", response_model=list[Article])
def get_user_articles(user_id: int, db: Session = Depends(get_db)):
    articles = db.query(ArticleModel).filter(ArticleModel.owner_id == user_id).all()
    return articles

@router.get("/articles/{article_id}", response_model=Article)
def read_article(article_id: int, db: Session = Depends(get_db)):
    db_article = db.query(ArticleModel).filter(ArticleModel.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return db_article

@router.put("/articles/{article_id}", response_model=Article)
def update_article(article_id: int, article: ArticleCreate, db: Session = Depends(get_db)):
    db_article = db.query(ArticleModel).filter(ArticleModel.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # تحديث الحقول
    db_article.title = article.title
    db_article.content = article.content
    db.commit()
    db.refresh(db_article)
    return db_article

@router.delete("/articles/{article_id}", response_model=dict)
def delete_article(article_id: int, db: Session = Depends(get_db)):
    db_article = db.query(ArticleModel).filter(ArticleModel.id == article_id).first()
    if db_article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(db_article)
    db.commit()
    return {"message": "Article deleted successfully"}
