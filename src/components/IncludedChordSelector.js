import React from "react";
import { chords } from "../chords";

export const IncludedChordsSelector = (props) => {
    const { includedChords, setIncludedChords } = props;
    const handleSelect = (event) => {
        const value = event.target.id;
        const isChecked = event.target.checked;
        if (isChecked) {
            setIncludedChords([...includedChords, value]);
        } else {
            const filteredList = includedChords.filter(
                (item) => item !== value
            );
            setIncludedChords(filteredList);
        }
    };

    return (
        <div style={{ "border-style": "solid" }}>
            Included Chords:
            {chords.map((item, index) => {
                return (
                    <div key={item.id} className="checkbox-container">
                        <input
                            type="checkbox"
                            name="chords"
                            value={item.label}
                            id={item.id}
                            onChange={handleSelect}
                            defaultChecked={item.defaultChecked}
                        />
                        <label>{item.label}</label>
                    </div>
                );
            })}
        </div>
    );
};

export default IncludedChordsSelector;
