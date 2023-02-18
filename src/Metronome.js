import React, { useState, useContext } from 'react';
import "./metronome.css";
import context from "./context";

const Metronome = (props) => {
    const { audioContext } = useContext(context);
    const [tempo, setTempo] = useState(120);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    let nextNoteTime = 0.0
    let currentBeatInBar = 0
    const lookahead = 25;
    const scheduleAheadTime = 0.1;
    const beatsPerBar = 4;

    const handleInputChange = (event) => {
        setTempo(event.target.value)
        console.log(event.target.value)
    };

    const nextNote = () => {
        console.log(tempo)
        const secondsPerBeat = 60.0 / tempo;
        nextNoteTime = nextNoteTime + secondsPerBeat
        currentBeatInBar++
        if (currentBeatInBar === beatsPerBar) {
            currentBeatInBar = 0
        }
    }

    const scheduleNote = (beatNumber, time) => {
        const osc = audioContext.createOscillator();
        const envelope = audioContext.createGain();

        osc.frequency.value = (beatNumber % beatsPerBar === 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(audioContext.destination);
        osc.start(time);
        osc.stop(time + 0.03);
    }

    const scheduler = () => {
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(currentBeatInBar, nextNoteTime);
            nextNote();
        }
    }

    const start = () => {
        if (isRunning) return;

        setIsRunning(true);

        currentBeatInBar = 0;
        nextNoteTime = audioContext.currentTime + 0.05;

        setIntervalId(setInterval(() => scheduler(), lookahead));
    }

    const stop = () => {
        setIsRunning(false);

        clearInterval(intervalId);
    }

    const startStop = () => {
        if (isRunning) {
            stop();
        }
        else {
            start();
        }
    }

    return (
        <div className="metronome">
            <div className="bpm-slider">
                <p>{tempo} BPM</p>
                <input
                    type="range"
                    min="60"
                    max="240"
                    value={tempo}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={startStop}>{isRunning ? "Stop" : "Start"}</button>
        </div>
    );
}

export default Metronome;
