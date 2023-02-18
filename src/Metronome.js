import React, { useState, useContext, useRef } from 'react';
import "./metronome.css";
import context from "./context";

const Metronome = (props) => {
    const { audioContext } = useContext(context);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [_, setFlush] = useState(0);
    const tempo = useRef(120);
    const nextNoteTime = useRef(0.0)
    const currentBeatInBar = useRef(0)
    const lookahead = 25;
    const scheduleAheadTime = 0.1;
    const beatsPerBar = 4;

    const handleInputChange = (event) => {
        tempo.current = event.target.value;
        setFlush(_ + 1);
    };

    const nextNote = () => {
        const secondsPerBeat = 60.0 / tempo.current;
        nextNoteTime.current = nextNoteTime.current + secondsPerBeat
        currentBeatInBar.current = currentBeatInBar.current + 1
        if (currentBeatInBar.current === beatsPerBar) {
            currentBeatInBar.current = 0
        }
        if (currentBeatInBar.current === 1) {
            props.setChangeChord(true)
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
        while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(currentBeatInBar.current, nextNoteTime.current);
            nextNote();
        }
    }

    const start = () => {
        if (isRunning) return;

        setIsRunning(true);

        currentBeatInBar.current = 0;
        nextNoteTime.current = audioContext.currentTime + 0.05;

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
                <p>{tempo.current} BPM</p>
                <input
                    type="range"
                    min="40"
                    max="240"
                    value={tempo.current}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={startStop}>{isRunning ? "Stop" : "Start"}</button>
        </div>
    );
}

export default Metronome;
