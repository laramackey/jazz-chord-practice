import React, { useState, useContext } from "react";

import "./App.css";
import ChordSymbol from "./components/ChordSymbol";
import Metronome from "./components/Metronome";
import Midi from "./components/Midi";

function App() {
    const [changeChord, setChangeChord] = useState(false);
    return (
        <div className="App">
            <Midi />
            <Metronome setChangeChord={setChangeChord} />
            <ChordSymbol
                setChangeChord={setChangeChord}
                changeChord={changeChord}
            />
        </div>
    );
}

export default App;
