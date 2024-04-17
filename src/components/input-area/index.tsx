import React from "react";

import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { json } from "@codemirror/lang-json";

import "./index.css";

const myTheme = createTheme({
    theme: "light",
    settings: {
        caret: "#fff",
        foreground: "#fff",
        background: "transparent",
        lineHighlight: "transparent",
        gutterForeground: "#fff",
        gutterBackground: "transparent",
        gutterBorder: "#8a8888",
    },
    styles: [
    ],
});

export default function InputArea(props: any) {
    const { value, onChange } = props;

    return (
        <div style={{ width: "90%", height: "40vh" }} className="input-area-wrapper">
            <CodeMirror
                value={value}
                autoFocus
                onChange={onChange}
                basicSetup={{
                    foldGutter: true,   
                    indentOnInput: false,
                }}
                extensions={[json()]}
                theme={myTheme}
                width="100%"
                height="100%"
            />
        </div>
    )
}

