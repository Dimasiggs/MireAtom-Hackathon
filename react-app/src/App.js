import { useState, useEffect } from 'react'
import { Tabs, TabList, Tab, TabPanel, DropZone, Disclosure, DisclosureTitle, DisclosurePanel } from 'react-aria-components';
import './aria-starter/Tabs.css';

import FormulaView from './FormulaView.js';
import Meter from './Meter.js';
import "./container.css";

const ComparingTwoFormulasTab = ({ ...props }) => {
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
        <TabPanel {...props}>
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
                {(latex1 !== '' && latex2 !== '') && <Meter label="Совпадение формул" value={matchingPercent} />}
                <h3>Формула 1</h3>
                <FormulaView latex={matchingLatex1} />
                <h3>Формула 2</h3>
                <FormulaView latex={matchingLatex2} />
            </section>
        </TabPanel>
    )
};


const SearchTab = ({ ...props }) => {
    const [latex, setLatex] = useState('');
    const [similarFormulas, setSimilarFormulas] = useState([]);

    useEffect(() => {
        if (latex === '') return;

        async function fetchFormulaSimilarity() {
            const url = new URL('/api/v01/formula/similar_formulas', window.location.origin);
            url.searchParams.set('formula', latex);

            const response = await fetch(url);
            const data = await response.json();
            setSimilarFormulas(data);
        }

        fetchFormulaSimilarity();
    }, [latex]);

    return (
        <TabPanel {...props}>
            <section>
                <h2>Ваша формула</h2>
                <FormulaView latex={latex} setLatex={setLatex} />
            </section>
            <section>
                <h2>Похожие формулы</h2>
                {similarFormulas.map(({ string1, string2, percent }, i) => (
                    <section>
                        <h3>Формула {i}</h3>
                        <Meter label="Совпадение формул" value={percent} />
                        <FormulaView latex={string2} />
                    </section>
                ))}
                {similarFormulas.length === 0 && <p>Похожих формул не найдено</p>}
            </section>
        </TabPanel>
    );
};

const ImageToLatexTab = ({ ...props }) => {
    const [image, setImage] = useState(null);
    const [latex, setLatex] = useState('');

    useEffect(() => {
        if (latex === '') return;

        async function fetchLatexFromImage() {
            const url = new URL('/api/v01/formula/img_to_latex', window.location.origin);
            const response = await fetch(url, {
                method: "post",
                body: image,
            })

            const data = await response.text();
            setLatex(data);
        }

        fetchLatexFromImage();
    }, [latex]);

    return (
        <TabPanel {...props}>
            <section>
                <h2>Ваше изображение</h2>
                <DropZone onDrop={console.log} />
            </section>
            <section>
                <h2>Формула</h2>
                {image === null
                    ? <p>Загрузите ваше изображение, чтобы получить из него формулу</p>
                    : <FormulaView latex={latex} setLatex={setLatex} />
                }
            </section>
        </TabPanel>
    );
};

const AboutTab = ({ ...props }) => {
    <TabPanel {...props}>
        <Disclosure>
            <DisclosureTitle>Как использовать наш сайт</DisclosureTitle>
            <DisclosurePanel>
                <p>
                    Преобразование формул в LaTeX: Введите вашу формулу в текстовое поле, и она будет автоматически преобразована в формат LaTeX. Это позволит вам легко использовать формулы в научных документах.
                </p>

                <p>
                    Сравнение формул: Вы можете сравнить введенную формулу с другими формулами в базе данных, чтобы проверить на совпадения и избежать плагиата.
                </p>

                <p>
                    Обработка изображений: Если у вас есть формула в формате PNG или JPG, загрузите изображение, и наш инструмент преобразует его в формат LaTeX.
                </p>
            </DisclosurePanel>
        </Disclosure>
        <Disclosure>
            <DisclosureTitle>Что такое LaTeX?</DisclosureTitle>
            <DisclosurePanel>
                <p>
                    LaTeX - это система вёрстки, основанная на языке разметки, которая позволяет создавать документы с высоким качеством типографики. Именно она позволяет пользователям легко управлять сложными документами, обеспечивая при этом высокую степень контроля над форматированием и представлением информации. Это делает LaTeX идеальным инструментом для научных публикаций, где точность и качество имеют первостепенное значение.
                </p>
            </DisclosurePanel>
        </Disclosure>
    </TabPanel>
};

function App() {
    return (
        <>
            <main class="container">
                <h1>Редактор и анализатор формул</h1>

                <Tabs>
                    <TabList>
                        <Tab id="about">О сайте</Tab>
                        <Tab id="two-formulas">Сравнить 2 формулы</Tab>
                        <Tab id="search-for-similar">Поиск похожих формул</Tab>
                        <Tab id="img-to-latex" disabled>Получить формулу из изображения</Tab>
                    </TabList>
                    <AboutTab id="about" />
                    <ComparingTwoFormulasTab id="two-formulas" />
                    <SearchTab id="search-for-similar" />
                    <ImageToLatexTab id="img-to-latex" />
                </Tabs>
            </main>
        </>
    );
}

export default App;
