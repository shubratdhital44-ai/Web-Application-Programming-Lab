from pydantic import BaseModel, EmailStr

# Input schema for registration
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# Input schema for login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Output schema (exclude password)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True