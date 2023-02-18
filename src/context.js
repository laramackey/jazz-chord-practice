import { createContext } from "react";

const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const context = createContext({ audioContext });

export default context;