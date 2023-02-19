import React, { useState, useEffect } from 'react';
import "./chordsymbol.css";

const ChordSymbol = (props) => {
    const generateRandomChord = () => {
        const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]
        const rootNotes = ["A♭", "A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "F♯", "G♭", "G",]
        const chords = ["7", "6", "Δ", "m7"]
        const inversions = ["root position", "first inversion", "second inversion", "third inversion"]
        const randomRootNote = randomElement(rootNotes)
        const randomChord = randomElement(chords)
        const randomInversion = randomElement(inversions)
        return `${randomRootNote}${randomChord} ${randomInversion}`
    }
    const [currentChord, setCurrentChord] = useState("")
    const [upcomingChord, setUpcomingChord] = useState("")

    useEffect(() => {
        if (props.changeChord) {
            props.setChangeChord(false)
            console.log(upcomingChord)
            setCurrentChord(upcomingChord)
            setUpcomingChord(generateRandomChord())
        }
    }, [props.changeChord]);

    return (
        <div className="chordsymbol">
            <p className="current">{currentChord}</p>
            <p className="upcoming">{upcomingChord}</p>
        </div>
    );
}

export default ChordSymbol;
