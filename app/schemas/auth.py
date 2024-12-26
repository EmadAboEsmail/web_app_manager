from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    # email:str

class User(BaseModel):
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
