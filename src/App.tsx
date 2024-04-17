import React, { useState } from 'react';

import './App.css';
import InputArea from './components/input-area';
import OutputArea from './components/output-area';
import useType from './hooks/useType';
import usePureJsonString from './hooks/usePureJsonString';

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");    

  const isJson = (str: string) => {
    const currentValue = str.trim();

    if (
        !(
            (currentValue[0] === "{" && currentValue.slice(-1) === "}") ||
            (currentValue[0] === "[" && currentValue.slice(-1) === "]")
        )
    ) {
        return false;
    }

    return true;
  }

  const format = (str: string) => {
    console.log("usePureJsonString(str)",usePureJsonString(str));
    
    const newValue = JSON.stringify(
        JSON.parse(usePureJsonString(str)),
        null,
        2,
    );

    if (newValue !== "{}") {
      setValue(newValue);
    } else {
      vscode.postMessage({ message: 'Invalid JSON, please check your input.'});
    }
  }

  const convert = () => {
    if (!isJson(value)) {
      vscode.postMessage({ message: 'Invalid JSON, please check your input.'});

      return;
    }
    
    const convertedString: any = useType(value);
    
    setResult(convertedString);
  }

  const copy = () => {
    navigator.clipboard.writeText(result);
  }

  const convertAndCopy = () => {
    if (!isJson(value)) {
      vscode.postMessage({ message: 'Invalid JSON, please check your input.'});

      return;
    }

    const convertedString: any = useType(value);

    navigator.clipboard.writeText(convertedString);

    setResult(convertedString);
  }
  
  return (
    <div className="app-wrapper">
        <InputArea value={value} onChange={setValue} />
        <div className="button-group">
            <div className="btn" onClick={() => format(value)}>
              Format
            </div>
            <div className="btn" onClick={convert}>
              Convert
            </div>
            <div className="btn" onClick={copy}>
              Copy
            </div>
            <div className="btn" onClick={convertAndCopy}>
              Convert & Copy
            </div>
        </div>
        <OutputArea value={result} />
    </div>
  );
}

export default App;
