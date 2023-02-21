import React, { useState, useEffect } from "react";
import "./chordsymbol.css";
import { rootNotes, chords } from "../chords";

const ChordSymbol = (props) => {
    const inversions = [0, 1, 2, 3];

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

    const mapFlatToSharp = (rootNote, bottomNote, isMinor) => {
        const rootKey = isMinor ? rootNote + "m" : rootNote;
        const sharpSignatures = ["C", "D", "E", "Em", "G", "A", "B", "Bm"];
        if (bottomNote.includes("♭") && sharpSignatures.includes(rootKey)) {
            const flatToSharp = {
                "D♭": "C#",
                "E♭": "D#",
                "G♭": "F#",
                "A♭": "G#",
                "B♭": "A#",
            };
            return flatToSharp[bottomNote];
        }
        return bottomNote;
    };

    const chordToString = (chord) => {
        const { rootNote, chordSymbol, notesInChord, inversion } = chord;
        const isMinor = chordSymbol.includes("m");
        const bottomNote =
            props.includeInversions && chord.inversion
                ? `/${mapFlatToSharp(rootNote, notesInChord[0], isMinor)}`
                : "";
        return `${rootNote}${chordSymbol}${bottomNote}`;
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
