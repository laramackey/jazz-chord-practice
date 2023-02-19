export const rootNotes = [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
];

export const chords = [
    {
        id: "7",
        label: "Dominant 7",
        defaultChecked: true,
        includedNotes: [0, 4, 7, 10],
    },
    {
        id: "Δ",
        label: "Major 7",
        defaultChecked: true,
        includedNotes: [0, 4, 7, 11],
    },
    {
        id: "m7",
        label: "Minor 7",
        defaultChecked: true,
        includedNotes: [0, 3, 7, 10],
    },
    {
        id: "6",
        label: "Major 6",
        defaultChecked: false,
        includedNotes: [0, 4, 7, 9],
    },
    {
        id: "o",
        label: "Dimished 7",
        defaultChecked: false,
        includedNotes: [0, 3, 6, 9],
    },
    {
        id: "ø",
        label: "Half diminished 7",
        defaultChecked: false,
        includedNotes: [0, 3, 6, 10],
    },
];
