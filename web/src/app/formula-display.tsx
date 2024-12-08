"use client";

import { useState } from "react";
import { TextField, Label, TextArea } from 'react-aria-components';
import { MathfieldElement } from "mathlive";

import "mathlive";
import "./TextField.css";
import "mathlive/fonts.css";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
        }
    }
}


export default function FormulaDisplay() {
    const [latex, setLatex] = useState("");

    const handleMathFieldChange = (e) => {
        const newLatex = e.target.value;
        setLatex(newLatex);
    };

    return (
        <>
            <div style={{
                marginBottom: "1em",
            }}>
                <math-field
                    contenteditable='true'
                    tabIndex='0'
                    onChange={handleMathFieldChange}
                    style={{ display: "block" }}
                >
                    {latex}
                </math-field>
            </div>

            <TextField value={latex} onChange={setLatex}>
                <Label>LaTeX: </Label>
                <TextArea />
            </TextField>
        </>
    );
}
