import React from "react";

export const IncludeInversionsSelector = (props) => {
    const { includeInversions, setIncludeInversions } = props;
    const handleSelect = (event) => {
        const isChecked = event.target.checked;
        setIncludeInversions(isChecked);
    };

    return (
        <div
            style={{
                "border-style": "solid",
                "border-style": "solid",
                float: "left",
                width: "33%",
            }}
        >
            Chord Inversions:
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    name="inversions"
                    // value={includeInversions}
                    onChange={handleSelect}
                    defaultChecked={includeInversions}
                />
                <label>On</label>
            </div>
        </div>
    );
};

export default IncludeInversionsSelector;
