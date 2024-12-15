import time

from fastapi import (
  FastAPI,
)
from starlette.responses import (
  FileResponse,
)
from starlette.staticfiles import StaticFiles

from app.api import api as api_v01

app = FastAPI()
app.mount("/api/v01", api_v01)
app.mount("/static", StaticFiles(directory="/code/build/static", html = True), name="static")


@app.get("/")
def main_html() -> FileResponse:
  try:
    while 1:
      return FileResponse("/code/build/index.html", status_code=200)
      break
  except:
    time.sleep(1)
