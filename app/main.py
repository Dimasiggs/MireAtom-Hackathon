from fastapi import (
  FastAPI,
)

from starlette.responses import HTMLResponse


app = FastAPI()

@app.get("/")
def read_root() -> HTMLResponse:
    return HTMLResponse(content="html_main_page!", status_code=200)
