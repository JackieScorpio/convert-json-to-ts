import React, { useCallback, useState } from 'react';

import './App.css';
import InputArea from './components/InputArea';
import OutputArea from './components/OutputArea';
import getType from './hooks/getType';
import getPureJsonString from './hooks/getPureJsonString';

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");    

  const format = useCallback((str: any) => {
    const newValue = JSON.stringify(
        JSON.parse(getPureJsonString(str)),
        null,
        2,
    );
    
    setValue(newValue);
  }, [setValue])

  const convert = useCallback(() => {
    const convertedString: string = getType(value);
    
    setResult(convertedString);
  },[value, setResult]);
  
  return (
    <div className="app-wrapper">
        <InputArea value={value} onChange={setValue} />
        <div className="button-group">
            <button className="btn" onClick={() => format(value)}>
                format input text
            </button>
            <button className="btn" onClick={convert}>
                convert
            </button>
        </div>
        <OutputArea value={result} />
    </div>
  );
}

export default App;
