"use client";

import type { Dispatch, SetStateAction } from "react";
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


export default function FormulaDisplay<S>({ latex, setLatex }: { latex: S, setLatex?: Dispatch<SetStateAction<S>> }) {
    const style = { display: "block" };
    const itemStyle = {
        marginBottom: "1em",
    };

    if (setLatex == null) return (
        <div style={itemStyle}>
            <math-field
                contenteditable='false'
                tabIndex='0'
                style={style}
            >
                {latex}
            </math-field>
        </div>
    );

    const handleMathFieldChange = (e) => {
        const newLatex = e.target.value;
        setLatex(newLatex);
    };

    return (
        <>
            <div style={itemStyle}>
                <math-field
                    contenteditable='true'
                    tabIndex='0'
                    onChange={handleMathFieldChange}
                    style={style}
                >
                    {latex}
                </math-field>
            </div>
        </>
    );
}
