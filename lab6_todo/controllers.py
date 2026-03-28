from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, auth

models.Base.metadata.create_all(bind=engine)
router = APIRouter()

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- REGISTER --------
@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.hash_password(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# -------- LOGIN --------
@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": f"Welcome {db_user.name}", "user_id": db_user.id}

# -------- ADD TODO --------
@router.post("/todos", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    new_todo = models.Todo(title=todo.title, owner_id=user_id)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

# -------- GET TODOS FOR USER --------
@router.get("/todos/{user_id}", response_model=list[schemas.TodoResponse])
def get_user_todos(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user.todos