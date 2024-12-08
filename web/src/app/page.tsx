import FormulaDisplay from './formula-display';
import styles from './page.module.css';



export default function Home() {
    return (
        <>
            <main className={styles.container}>
                <span>Test</span>
                <FormulaDisplay />
            </main>
            <footer></footer>
        </>
    );
}
