import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { rootNotes } from "../chords";

const Midi = (props) => {
    const [options, setOptions] = useState([]);
    const [access, setAccess] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const midiDevice = useRef(null);
    const currentChord = useRef([]);

    const setMidiOptions = (access) => {
        const midiOptions = Array.from(access.inputs.values()).map((input) => ({
            value: input.name,
            label: input.name,
        }));
        if (
            !midiOptions
                .map((option) => option.value)
                .includes(midiDevice.current?.name)
        ) {
            setSelectedOption(null);
        }
        setOptions(midiOptions);
    };
    useEffect(() => {
        const initMidi = async () => {
            const access = await navigator.requestMIDIAccess();
            setAccess(access);
            access.onstatechange = () => {
                setMidiOptions(access);
            };
            setMidiOptions(access);
        };
        initMidi().catch(console.error);
    }, []);

    const checkCurrentChord = () => {
        if (currentChord.current.length === 4) {
            const playingChord = currentChord.current
                .sort()
                .map((n) => rootNotes[n % 12]);
            props.setPlayingChord(playingChord);
        }
    };

    const getMIDIMessage = (midiMessage) => {
        const noteOnMidi = [144, 146];
        const noteOffMidi = [128, 130];
        const midiMessageType = midiMessage.data[0];
        if (![...noteOnMidi, ...noteOffMidi].includes(midiMessageType)) {
            return;
        }
        const noteMidiValue = midiMessage.data[1];
        const notePositionInChord = currentChord.current.indexOf(noteMidiValue);
        const noteInChord = notePositionInChord > -1;
        if (noteOffMidi.includes(midiMessageType) && noteInChord) {
            currentChord.current.splice(notePositionInChord, 1);
            checkCurrentChord();
        } else if (noteOnMidi.includes(midiMessageType) && !noteInChord) {
            currentChord.current.push(noteMidiValue);
            checkCurrentChord();
        }
    };

    const handleMidiSelectChange = (event) => {
        if (midiDevice.current) {
            midiDevice.current.onmidimessage = null;
        }
        const inputs = Array.from(access.inputs.values());
        const selected = inputs.find((i) => i.name === event.value);
        midiDevice.current = selected;
        selected.onmidimessage = getMIDIMessage;
        setSelectedOption({ value: selected.name, label: selected.name });
    };
    return (
        <Select
            options={options}
            placeholder="Select midi device"
            onChange={handleMidiSelectChange}
            value={selectedOption}
        />
    );
};

export default Midi;
