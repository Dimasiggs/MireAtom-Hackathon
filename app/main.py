from fastapi import (
  FastAPI,
)

from starlette.responses import HTMLResponse


app = FastAPI()

@app.get("/")
def read_root() -> HTMLResponse:
    html_main_page = open(f"frontend/index.html", "r", encoding="utf-8").read()
    return HTMLResponse(content=html_main_page, status_code=200)
