import React, { useState } from 'react';
import "./metronome.css";

const click1Source = "//daveceddia.com/freebies/react-metronome/click1.wav";
const click2Source = "//daveceddia.com/freebies/react-metronome/click2.wav";

const Metronome = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState(0);
    const [bpm, setBpm] = useState(100);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
    const [timer, setTimer] = useState(null)

    const click1 = new Audio(click1Source);
    const click2 = new Audio(click2Source);

    const handleInputChange = (event) => {
        const bpm = event.target.value;

        if (isPlaying) {
            clearInterval(timer);
            setTimer(setInterval(this.playClick, (60 / bpm) * 1000));
            setCount(0)
        }
        setBpm(bpm)
    };

    const playClick = () => {
        if (count % beatsPerMeasure === 0) {
            click2.play();
        } else {
            click1.play();
        }

        setCount((count + 1) % beatsPerMeasure)
    };

    const startStop = () => {
        console.log({ isPlaying })
        if (isPlaying) {
            clearInterval(timer);
            setIsPlaying(false)
            console.log(timer)
        } else {
            setTimer(setInterval(playClick, (60 / bpm) * 1000));
            setCount(0)
            setIsPlaying(true)
            playClick()
        }
    };

    return (
        <div className="metronome">
            <div className="bpm-slider">
                <p>{bpm} BPM</p>
                <input
                    type="range"
                    min="60"
                    max="240"
                    value={bpm}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={startStop}>{isPlaying ? "Stop" : "Start"}</button>
        </div>
    );
}

export default Metronome;
