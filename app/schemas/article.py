#### 12. `/schemas/article.py`
from pydantic import BaseModel

class ArticleBase(BaseModel):
    title: str
    content: str
    category_id: int

class ArticleCreate(ArticleBase):
    pass

class Article(ArticleBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


