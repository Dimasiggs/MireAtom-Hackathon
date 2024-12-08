import sqlite3


# TODO: переделать под postgresql
class Formulas:
    def __init__(self, database_name: str) -> None:
        connection = sqlite3.connect(database_name)
        self._connection = connection

    def get_all_formulas(self) -> list:
        return self._connection.execute("""SELECT formula FROM Formulas""").fetchall()

    def add_formula(self, formula: str) -> None:
        self._connection.execute("""INSERT INTO Formulas (formula) VALUES (?)""", (formula,))
        self._connection.commit()
