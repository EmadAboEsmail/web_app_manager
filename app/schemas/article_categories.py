#### 15. `/schemas/article_categories.py`
from pydantic import BaseModel

class ArticleCategoryBase(BaseModel):
    name: str

class ArticleCategoryCreate(ArticleCategoryBase):
    pass
class ArticleCategoryUpdate(ArticleCategoryBase):
    pass
class ArticleCategory(ArticleCategoryBase):
    id: int

    class Config:

        from_attributes = True


