from fastapi import (
    FastAPI,
)

from fuzzywuzzy import fuzz

import database

api = FastAPI()

Formulas = database.Formulas("database.db")


def formulas_similarity(f1: str, f2: str) -> int:
    return fuzz.ratio(f1, f2) # TODO: МБ переделать алгоритм определения сходства формул


@api.get("/formula/similarity")
async def get_formulas_similarity_percentage(formula1, formula2) -> int:
    return formulas_similarity(formula1, formula2)


@api.get("/formula/similar_formulas")
async def get_similar_formulas_in_db(formula) -> list:
    result = []
    for i in Formulas.get_all_formulas():
        if formulas_similarity(formula, i) >= 70:
            result.append(i)
    return result


@api.post("/formula")
async def add_formula(formula) -> None:
    Formulas.add_formula(formula)
