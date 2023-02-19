import React, { useState, useEffect } from "react";
import "./chordchecker.css";

const ChordChecker = (props) => {
    const { correctChord, playingChord, includeInversions } = props;
    const [message, setMessage] = useState("");
    const chordEquality = (a, b) => {
        let chordA = a;
        let chordB = b;
        if (!includeInversions) {
            chordA = a.sort();
            chordB = b.sort();
        }
        return (
            chordA.length === chordB.length &&
            chordA.every((val, index) => val === chordB[index])
        );
    };
    useEffect(() => {
        setMessage("");
    }, [correctChord]);
    useEffect(() => {
        if (correctChord?.length && playingChord?.length) {
            if (chordEquality(correctChord, playingChord)) {
                setMessage("CORRECT ✔✔✔");
            } else {
                setMessage("INCORRECT ✘");
            }
        }
    }, [playingChord]);
    return <div className="chordchecker">{message}</div>;
};

export default ChordChecker;
