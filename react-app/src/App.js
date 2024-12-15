import { useState, useEffect } from 'react'
import FormulaView from './FormulaView.js';
import "./container.css";

function App() {
    const [latex1, setLatex1] = useState('');
    const [latex2, setLatex2] = useState('');
    const [matchingLatex1, setMatchingLatex1] = useState('');
    const [matchingLatex2, setMatchingLatex2] = useState('');
    const [matchingPercent, setMatchingPercent] = useState(0);


    useEffect(() => {
        if (latex1 === '' || latex2 === '') return;
        const templateUrl = new URL('/api/v01/formula/', window.location.origin);
        templateUrl.searchParams.set('formula1', latex1);
        templateUrl.searchParams.set('formula2', latex2);

        async function fetchFormulaSimilarity() {
            const url = new URL('similarity', templateUrl.href);
            url.search = templateUrl.searchParams.toString();

            const response = await fetch(url);
            const data = await response.json();
            setMatchingPercent(+data.percent);
            setMatchingLatex1(data.string1);
            setMatchingLatex2(data.string2);
        }

        fetchFormulaSimilarity();
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
                    {matchingPercent > 0 && <p>Формулы совпадают на {matchingPercent}%</p>}
                    <h3>Формула 1</h3>
                    <FormulaView latex={matchingLatex1} />
                    <h3>Формула 2</h3>
                    <FormulaView latex={matchingLatex2} />
                </section>
            </main>
        </>
    );
}

export default App;
