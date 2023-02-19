import React from "react";
import IncludedChordsSelector from "./IncludedChordSelector";
import IncludeInversionsSelector from "./IncludeInversionsSelector";
import Midi from "./Midi";

export const Settings = (props) => {
    return (
        <div style={{ display: "flex", "flex-direction": "row" }}>
            <Midi setPlayingChord={props.setPlayingChord} />
            <IncludedChordsSelector
                includedChords={props.includedChords}
                setIncludedChords={props.setIncludedChords}
            />
            <IncludeInversionsSelector
                setIncludeInversions={props.setIncludeInversions}
                includeInversions={props.includeInversions}
            />
        </div>
    );
};

export default Settings;
