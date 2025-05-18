import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const terminal = new Terminal();

export default function App() {
  const [code, setCode] = useState(print('Hello, young coder!'));

  const runCode = async () => {
    terminal.clear();
    const res = await axios.post("https://your-backend-url.up.railway.app/run", { code });
    if (res.data.stdout) terminal.write(res.data.stdout);
    if (res.data.stderr) terminal.write(res.data.stderr);
    if (res.data.error) terminal.write(res.data.error);
  };

  useEffect(() => {
    terminal.open(document.getElementById("terminal"));
  }, []);

  return (
    <div className="p-4">
      <textarea
        className="w-full h-40 p-2 border"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write Python code here..."
      />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white" onClick={runCode}>
        Run
      </button>
      <div id="terminal" className="mt-4 border h-60 overflow-auto bg-black text-white" />
    </div>
  );
}