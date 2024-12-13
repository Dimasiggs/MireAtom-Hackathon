import { useState } from "react"
import FormulaView from "./FormulaView.js";

function App() {
    const [latex1, setLatex1] = useState("");
    const [latex2, setLatex2] = useState("");
    const [matchingLatex, setMatchingLatex] = useState("");

    return (
        <>
            <main>
                <h1>Редактор и анализатор формул</h1>
                <section>
                    <h2>Формула 1</h2>
                    <FormulaView latex={latex1} setLatex={setLatex1} />
                </section>
                <section>
                    <h2>Формула 2</h2>
                    <FormulaView latex={latex2} setLatex={setLatex2} />
                </section>
                <section>
                    <h2>Совпадение формул</h2>
                    <FormulaView latex={matchingLatex} />
                </section>
            </main>
        </>
    );
}

export default App;
