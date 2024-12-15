import { Meter, Label } from 'react-aria-components';
import "./Meter.css"


function MyMeter({ label, ...props }) {
    return (
        <Meter {...props} className={({ percentage }) => {
            const prefix = 'react-aria-Meter meter--value--';

            if (percentage <= 30) return prefix + "low";
            if (percentage <= 70) return prefix + "medium";
            return prefix + "high";
        }}>
            {({ percentage, valueText }) => <>
                <Label>{label}</Label>
                <span className="value">{valueText}</span>
                <div className="bar">
                    <div className="fill" style={{ width: percentage + '%' }} />
                </div>
            </>}
        </Meter >
    )
}

export default MyMeter;
