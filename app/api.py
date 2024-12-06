from fastapi import (
    FastAPI,
)

from fuzzywuzzy import fuzz



api = FastAPI()


@api.get("/formula/similarity")
async def get_formulas_similarity_percentage(formula1, formula2) -> int:
    return fuzz.ratio(formula1, formula2) # TODO: МБ переделать алгоритм определения сходства формул


@api.get("/formula/similar")
async def get_similar_formulas_in_db(formula) -> list:
    return [formula] * 10 # TODO: Возвращать похожие формулы из бд


@api.post("/formula")
async def add_formula(formula) -> None:
    ... # TODO: Добавить формулу в бд


