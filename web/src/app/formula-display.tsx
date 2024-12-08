"use client";

import { useState, useRef, useEffect } from "react";
import { MathfieldElement } from "mathlive";
import "mathlive";
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
        <div className='App'>
            <h1>MathLive with React</h1>
            <math-field
                contenteditable='true'
                tabIndex='0'
                onChange={handleMathFieldChange}>
                {latex}
            </math-field>
        </div>
    );
}
