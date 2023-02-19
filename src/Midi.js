import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

const Midi = () => {
    const [options, setOptions] = useState([]);
    const [access, setAccess] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const midiDeviceRef = useRef(null);

    const setMidiOptions = (access) => {
        const midiOptions = Array.from(access.inputs.values()).map((input) => ({
            value: input.name,
            label: input.name,
        }));
        if (
            !midiOptions
                .map((option) => option.value)
                .includes(midiDeviceRef.current?.name)
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

    const handleMidiSelectChange = (event) => {
        const inputs = Array.from(access.inputs.values());
        const selected = inputs.find((i) => i.name === event.value);
        midiDeviceRef.current = selected;
        setSelectedOption({ value: selected.name, label: selected.name });
    };
    return (
        <Select
            options={options}
            placeholder="Select midi device"
            onChange={handleMidiSelectChange}
            value={selectedOption}
            isClearable
        />
    );
};

export default Midi;
