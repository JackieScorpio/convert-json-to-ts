import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { json } from "@codemirror/lang-json";

const myTheme = createTheme({
    theme: "light",
    settings: {
        foreground: "#000000",
        background: "#ffffff",
        gutterBackground: "#ffffff",
        lineHighlight: "#ffffff",
        gutterBorder: "#ffffff",
    },
    styles: [
    ],
});

export default function InputArea(props: any) {
    const { value, onChange } = props;

    return (
        <CodeMirror
            value={value}
            autoFocus
            onChange={onChange}
            basicSetup={{
                foldGutter: true,   
                indentOnInput: false,
            }}
            extensions={[json()]}
            height="60vh"
            width="40vw"
            theme={myTheme}
        />
    )
}

