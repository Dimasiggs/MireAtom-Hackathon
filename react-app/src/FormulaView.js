import { TextField, Label, TextArea } from 'react-aria-components';
import 'mathlive';
import 'mathlive/fonts.css';
import './aria-starter/TextField.css';

function FormulaView({ latex, setLatex }) {
    const mathFieldStyle = {
        display: 'block',
        marginBottom: '1em',
    };

    if (setLatex == null) return (
        <>
            <math-field
                contenteditable='false'
                tabIndex='0'
                style={mathFieldStyle}
            >
                {latex}
            </math-field>
        </>
    );

    const onInput = (e) => setLatex(e.target.value);

    return (
        <>
            <math-field
                contenteditable='true'
                tabIndex='0'
                onInput={onInput}
                style={mathFieldStyle}
            >
                {latex}
            </math-field>

            <TextField value={latex} onChange={setLatex} style={{
                width: '100%',
            }}>
                <Label>LaTeX</Label>
                <TextArea style={{
                    resize: 'vertical',
                }} />
            </TextField>
        </>
    );
}


export default FormulaView;
