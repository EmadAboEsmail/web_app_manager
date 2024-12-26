
#### 8. `/models/article_categories.py`
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class ArticleCategory(Base):
    __tablename__ = "article_categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    # العلاقة مع المقالات
    articles = relationship("Article", back_populates="category")
