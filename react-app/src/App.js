import { useState, useEffect } from 'react'
import FormulaView from './FormulaView.js';
import "./container.css";

function App() {
    const [latex1, setLatex1] = useState('');
    const [latex2, setLatex2] = useState('');
    const [matchingLatex, setMatchingLatex] = useState('');

    useEffect(() => {
        const templateUrl = new URL('/api/v01/formula', window.location.origin);
        templateUrl.searchParams.set('formula1', latex1);
        templateUrl.searchParams.set('formula2', latex2);

        async function fetchSimilarFormulas() {
            const url = new URL('similar_formulas', templateUrl.href);
            url.search = templateUrl.searchParams.toString();

            const response = await fetch(url);
            const data = await response.text();
            setMatchingLatex(data);
        }

        fetchSimilarFormulas();
    }, [latex1, latex2]);

    return (
        <>
            <main class="container">
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
