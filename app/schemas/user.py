###  9. `/schemas/user.py`
from pydantic import BaseModel
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
class UserBase(BaseModel):
    username: str
    password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
       from_attributes = True


