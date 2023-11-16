"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_codemirror_1 = __importDefault(require("@uiw/react-codemirror"));
const codemirror_themes_1 = require("@uiw/codemirror-themes");
const lang_json_1 = require("@codemirror/lang-json");
const myTheme = (0, codemirror_themes_1.createTheme)({
    theme: "light",
    settings: {
        foreground: "#000000",
        background: "#ffffff",
        gutterBackground: "#ffffff",
        lineHighlight: "#ffffff",
        gutterBorder: "#ffffff",
    },
    styles: [],
});
function InputArea(props) {
    const { value, onChange } = props;
    return ((0, jsx_runtime_1.jsx)(react_codemirror_1.default, { value: value, autoFocus: true, onChange: onChange, basicSetup: {
            foldGutter: true,
            indentOnInput: false,
        }, extensions: [(0, lang_json_1.json)()], height: "60vh", width: "40vw", theme: myTheme }));
}
exports.default = InputArea;
//# sourceMappingURL=InputArea.js.map