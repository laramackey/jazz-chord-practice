import React, { useState, useEffect } from "react";
import "./chordsymbol.css";
import { rootNotes, chords } from "../chords";

const ChordSymbol = (props) => {
    const inversions = [
        "root position",
        "first inversion",
        "second inversion",
        "third inversion",
    ];

    const getNotesInChord = (rootNote, chordSymbol, inversion) => {
        const rootNoteIndex = rootNotes.indexOf(rootNote);
        const notePositions = chords.find(
            (symbol) => symbol.id === chordSymbol
        ).includedNotes;
        const notesInChord = notePositions.map((position) => {
            const i = rootNoteIndex + position;
            const n = rootNotes.length;
            return rootNotes[((i % n) + n) % n];
        });
        const rotationAmount = inversions.indexOf(inversion);
        return notesInChord
            .concat(notesInChord)
            .slice(rotationAmount, rotationAmount + notesInChord.length);
    };
    const generateRandomChord = () => {
        const randomElement = (arr) =>
            arr[Math.floor(Math.random() * arr.length)];
        const chordSymbols = chords
            .filter((c) => props.includedChords.includes(c.id))
            .map((c) => c.id);
        const randomRootNote = randomElement(rootNotes);
        const randomChordSymbol = randomElement(chordSymbols);
        const randomInversion = randomElement(inversions);
        return {
            rootNote: randomRootNote,
            chordSymbol: randomChordSymbol,
            inversion: randomInversion,
            notesInChord: getNotesInChord(
                randomRootNote,
                randomChordSymbol,
                randomInversion
            ),
        };
    };

    const chordToString = (chord) => {
        return `${chord.rootNote}${chord.chordSymbol}${
            props.includeInversions ? " " + chord.inversion : ""
        }`;
    };
    const [currentChord, setCurrentChord] = useState(null);
    const [upcomingChord, setUpcomingChord] = useState(null);

    useEffect(() => {
        if (props.changeChord) {
            props.setChangeChord(false);
            props.setCorrectChord(upcomingChord?.notesInChord);
            setCurrentChord(upcomingChord);
            setUpcomingChord(generateRandomChord());
        }
    }, [props.changeChord]);

    return (
        <div className="chordsymbol">
            <p className="current">
                {currentChord ? chordToString(currentChord) : ""}
            </p>
            <p className="upcoming">
                {upcomingChord ? chordToString(upcomingChord) : ""}
            </p>
        </div>
    );
};

export default ChordSymbol;
