from fastapi import (
  FastAPI,
)
from app.api import api as api_v01

app = FastAPI()
app.mount("/api/v01", api_v01)
