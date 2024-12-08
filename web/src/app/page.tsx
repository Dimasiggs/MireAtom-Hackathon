import FormulaDisplay from './formula-display';
import styles from './page.module.css';



export default function Home() {
    return (
        <>
            <main className={styles.container}>
                <h1>Редактор формул</h1>
                <FormulaDisplay />
            </main>
            <footer></footer>
        </>
    );
}
