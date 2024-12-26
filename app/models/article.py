#### 5. `/models/article.py`
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("article_categories.id"))

    # العلاقات
    category = relationship("ArticleCategory", back_populates="articles")
    owner = relationship("User", back_populates="articles")
