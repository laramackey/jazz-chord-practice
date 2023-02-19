import React, { useState } from "react";

import "./App.css";
import ChordSymbol from "./components/ChordSymbol";
import Metronome from "./components/Metronome";
import Midi from "./components/Midi";
import ChordChecker from "./components/ChordChecker";

function App() {
    const [changeChord, setChangeChord] = useState(false);
    const [correctChord, setCorrectChord] = useState([]);
    const [playingChord, setPlayingChord] = useState([]);
    return (
        <div className="App">
            <Midi setPlayingChord={setPlayingChord} />
            <Metronome setChangeChord={setChangeChord} />
            <ChordSymbol
                setChangeChord={setChangeChord}
                changeChord={changeChord}
                setCorrectChord={setCorrectChord}
            />
            <ChordChecker
                correctChord={correctChord}
                playingChord={playingChord}
            />
        </div>
    );
}

export default App;
