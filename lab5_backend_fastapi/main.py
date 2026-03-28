from fastapi import FastAPI
from controllers import router as auth_router

app = FastAPI(title="LAB5 - FastAPI Auth Example")

# Include auth routes
app.include_router(auth_router)