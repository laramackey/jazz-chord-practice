import React from "react";
import IncludedChordsSelector from "./IncludedChordSelector";
import IncludeInversionsSelector from "./IncludeInversionsSelector";

export const Settings = (props) => {
    return (
        <div>
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
