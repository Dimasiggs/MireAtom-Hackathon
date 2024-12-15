from fastapi import (
    FastAPI,
)

from fuzzywuzzy import fuzz
#from pix2tex.cli import LatexOCR


import sympy
from sympy.parsing.latex import parse_latex

import app.database as database

api = FastAPI()
Formulas = database.Formulas("database.db")
#model = LatexOCR()


#def img_to_latex(img) -> str:
#    return model(img)




def expr_to_nested_list(expr, max_depth: int, current_depth: int = 0):
    if expr.is_Atom or current_depth >= max_depth:
        return [expr]
    args = [expr_to_nested_list(arg, max_depth, current_depth + 1) for arg in expr.args]

    return args


def flatten(nested_list) -> list:
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result


def expression_all_subtrees(ex: sympy.exp, min_len: int) -> list:
    depth = 0
    subtrees = []
    _tree = []
    while 1:
        tree = expr_to_nested_list(ex, depth)
        tree = set(flatten(tree))
        if tree == _tree:
            break

        subtrees += [a for a in tree if len(str(a).replace(" ", "")) >= min_len]

        _tree = tree
        depth += 1

    return list(set(subtrees))


def formulas_similarity(s1, s2, min_len):
    expr1 = parse_latex(s1)
    expr2 = parse_latex(s2)

    subtrees1 = expression_all_subtrees(expr1, min_len)
    subtrees2 = expression_all_subtrees(expr2, min_len)
    expressions = []

    for i in subtrees1:
        for j in subtrees2:
            if i.equals(j):
                expressions.append((i, j))

    latex_expr1 = str(sympy.latex(expr1))
    latex_expr2 = str(sympy.latex(expr2))
    for i in expressions:
        latex_expr1 = latex_expr1.replace(sympy.latex(i[0]), r"\colorbox{#88E788}{" + str(sympy.latex(i[0])) + "}")
        latex_expr2 = latex_expr2.replace(sympy.latex(i[1]), r"\colorbox{#88E788}{" + str(sympy.latex(i[1])) + "}")

    return {"s1": latex_expr1, "s2": latex_expr2, "percent": fuzz.ratio(s1, s2)}


@api.get("/formula/img_to_latex")
async def get_latex_from_img(img) -> str:
    return "latex formula from pdf!" #img_to_latex(img)


# Получить схожесть введенных формул
@api.get("/formula/similarity")
async def get_formulas_similarity_percentage(formula1, formula2) -> dict:
    return formulas_similarity(formula1, formula2, 4)


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
