import React, { useState } from "react";

import "./App.css";
import ChordSymbol from "./components/ChordSymbol";
import Metronome from "./components/Metronome";
import Midi from "./components/Midi";
import ChordChecker from "./components/ChordChecker";
import Settings from "./components/Settings";
import { chords } from "./chords";

function App() {
    const [changeChord, setChangeChord] = useState(false);
    const [correctChord, setCorrectChord] = useState([]);
    const [playingChord, setPlayingChord] = useState([]);
    const [includedChords, setIncludedChords] = useState(
        chords.filter((c) => c.defaultChecked).map((c) => c.id)
    );
    const [includeInversions, setIncludeInversions] = useState(true);
    return (
        <div className="App">
            <Midi setPlayingChord={setPlayingChord} />
            <Settings
                setIncludedChords={setIncludedChords}
                includedChords={includedChords}
                includeInversions={includeInversions}
                setIncludeInversions={setIncludeInversions}
            />
            <Metronome setChangeChord={setChangeChord} />
            <ChordSymbol
                setChangeChord={setChangeChord}
                changeChord={changeChord}
                setCorrectChord={setCorrectChord}
                includedChords={includedChords}
                includeInversions={includeInversions}
            />
            <ChordChecker
                correctChord={correctChord}
                playingChord={playingChord}
                includeInversions={includeInversions}
            />
        </div>
    );
}

export default App;
