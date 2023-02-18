import Metronome from "./Metronome";
import './App.css';
import ChordSymbol from "./ChordSymbol";
import React, { useState, useContext } from 'react';

function App() {
  const [changeChord, setChangeChord] = useState(false)
  return (
    <div className="App">
      <Metronome
        setChangeChord={setChangeChord}
      />
      <ChordSymbol
        setChangeChord={setChangeChord}
        changeChord={changeChord}
      />
    </div>
  );
}

export default App;
