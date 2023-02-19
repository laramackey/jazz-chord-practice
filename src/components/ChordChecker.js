import React, { useState, useEffect } from "react";
import "./chordchecker.css";

const ChordChecker = (props) => {
    const { correctChord, playingChord } = props;
    const [message, setMessage] = useState("");
    const chordEquality = (a, b) => {
        return (
            Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index])
        );
    };
    useEffect(() => {
        setMessage("");
    }, [correctChord]);
    useEffect(() => {
        if (correctChord?.length && playingChord?.length) {
            console.dir({ correctChord });
            console.dir({ playingChord });
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
