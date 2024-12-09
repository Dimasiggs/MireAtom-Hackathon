import random

from fastapi import (
    FastAPI,
)

from fuzzywuzzy import fuzz

import app.database as database

api = FastAPI()
Formulas = database.Formulas("database.db")

# Функция для сравнения формул на схожесть
def formulas_similarity(s1, s2, l=0) -> dict:
    q1 = s1
    q2 = s2
    if len(s1) > len(s2):
        q1 = s2
        q2 = s1

    # Проходимся по всем подстрокам и записываем все совпавшие
    for start in range(len(q1)):
        for end in range(len(q1), start + l, -1):
            substring = q1[start:end]
            if substring in q2:
                q2 = q2.replace(substring, "")
                color = hex(random.randrange(0, 2 ** 24))[2:]
                color = "88E788"
                s1 = s1.replace(substring, "\colorbox{#" + color + "}{" + substring + "}")
                s2 = s2.replace(substring, "\colorbox{#" + color + "}{" + substring + "}")

    return {"string1": s1, "string2": s2, "percent": fuzz.ratio(s1, s2)}


# Получить схожесть введенных формул
@api.get("/formula/similarity")
async def get_formulas_similarity_percentage(formula1, formula2) -> dict:
    return formulas_similarity(formula1, formula2)


# TODO: переделать с новым сравнением на схожесть
# Получить все схожие формулы с введенной
@api.get("/formula/similar_formulas")
async def get_similar_formulas_in_db(formula) -> list:
    result = []
    for i in Formulas.get_all_formulas():
        if formulas_similarity(formula, i)["percent"] >= 70:
            result.append(i)
    return result

# Добавить формулу в БД
@api.post("/formula")
async def add_formula(formula) -> None:
    Formulas.add_formula(formula)
