import React, { useState, useContext } from "react";

import "./App.css";
import ChordSymbol from "./ChordSymbol";
import Metronome from "./Metronome";
import Midi from "./Midi";

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
