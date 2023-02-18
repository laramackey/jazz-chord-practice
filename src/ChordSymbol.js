import React, { useState, useEffect } from 'react';
import "./chordsymbol.css";

const ChordSymbol = (props) => {
    const [chord, setChord] = useState("C7 root position")
    const generateRandomChord = () => {
        const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]
        const rootNotes = ["A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "F♯", "G♭", "G",]
        const chords = ["7", "6", "Δ", "m7"]
        const inversions = ["root position", "first inversion", "second inversion", "third inversion"]
        const randomRootNote = randomElement(rootNotes)
        const randomChord = randomElement(chords)
        const randomInversion = randomElement(inversions)
        setChord(`${randomRootNote}${randomChord} ${randomInversion}`)
    }

    useEffect(() => {
        props.setChangeChord(false)
        generateRandomChord()
    }, [props.changeChord]);

    return (
        <div className="chordsymbol">
            {chord}
        </div>
    );
}

export default ChordSymbol;
