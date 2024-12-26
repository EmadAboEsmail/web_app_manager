from fastapi import FastAPI
from app.routers import users ,expense_categories, income_categories,article_categories,articles, incomes, expenses
from app.database.database import Base,engine

from fastapi.middleware.cors import CORSMiddleware

from app.models.user import User  # تأكد من استيراد نموذج User
from app.models.article import Article  # تأكد من استيراد نموذج Articles
from app.models.article_categories import ArticleCategory

Base.metadata.create_all(bind=engine)

app = FastAPI()
# app.add_middleware(
#        CORSMiddleware,
#        allow_origins=["*"],  # يمكنك تحديد الأصول المسموح بها
#        allow_credentials=True,
#        allow_methods=["*"],
#        allow_headers=["*"],
#    )
#
#
origins = [
    "http://localhost:5173",  # النطاق الذي تريد السماح له
    "http://127.0.0.1:5173",  # النطاق المحلي
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # السماح بالنطاقات المحددة
    allow_credentials=True,
    allow_methods=["*"],  # السماح بجميع طرق HTTP
    allow_headers=["*"],  # السماح بجميع الرؤوس
)

# # تضمين المسارات المختلفة
app.include_router(users.router)
app.include_router(income_categories.router)
app.include_router(expense_categories.router)
app.include_router(incomes.router)
app.include_router(expenses.router)
app.include_router(articles.router)
 
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}

