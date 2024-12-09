'use client';


import { useState, useEffect } from 'react';
import { Form } from 'react-aria-components';
import { TextField, Label, TextArea } from 'react-aria-components';
import FormulaDisplay from './formula-display';
import styles from './page.module.css';


export default function Home() {
    const [latex, setLatex] = useState('');
    const [otherLatex, setOtherLatex] = useState('');
    const [outputLatex, setOutputLatex] = useState('');
    const [similarityPercent, setSimilarityPercent] = useState('?');


    useEffect(() => {
        const serverHost = 'http://localhost:80';
        const query = new URLSearchParams();
        query.set('formula1', latex);
        query.set('formula2', otherLatex);

        async function fetchSimilarFormulas() {
            const url = new URL(serverHost);
            url.pathname = '/formula/similar_formulas';
            url.search = query.toString();

            let res = await fetch(url);
            let data = await res.text();
            setOutputLatex(data);
        }
        async function fetchSimilarityPercent() {
            const url = new URL(serverHost);
            url.pathname = '/formula/similarity';
            url.search = query.toString();

            let res = await fetch(url);
            let data = await res.text();
            setSimilarityPercent(data);
        }

        fetchSimilarFormulas();
        fetchSimilarityPercent();
    }, [latex, otherLatex]);

    return (
        <>
            <main className={styles.container}>
                <h1>Редактор формул</h1>
                <FormulaDisplay latex={latex} setLatex={setLatex} />
                <TextField value={latex} onChange={setLatex}>
                    <Label>LaTeX</Label>
                    <TextArea />
                </TextField>

                <h2>Формула для сравнения</h2>
                <FormulaDisplay latex={otherLatex} setLatex={setOtherLatex} />

                <h2>Результат сравнения</h2>
                <p>Формулы похожи на {similarityPercent}%</p>
                <FormulaDisplay latex={outputLatex} />
            </main>
            <footer></footer>
        </>
    );
}
