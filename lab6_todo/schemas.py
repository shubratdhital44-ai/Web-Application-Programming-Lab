from pydantic import BaseModel, EmailStr

# User schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    class Config:
        orm_mode = True

# Todo schemas
class TodoCreate(BaseModel):
    title: str

class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
    owner_id: int
    class Config:
        orm_mode = True