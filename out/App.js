"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
const InputArea_1 = __importDefault(require("./components/InputArea"));
const OutputArea_1 = __importDefault(require("./components/OutputArea"));
const getType_1 = __importDefault(require("./hooks/getType"));
const getPureJsonString_1 = __importDefault(require("./hooks/getPureJsonString"));
function App() {
    const [value, setValue] = (0, react_1.useState)("");
    const [result, setResult] = (0, react_1.useState)("");
    const format = (0, react_1.useCallback)((str) => {
        const newValue = JSON.stringify(JSON.parse((0, getPureJsonString_1.default)(str)), null, 2);
        setValue(newValue);
    }, [setValue]);
    const convert = (0, react_1.useCallback)(() => {
        const convertedString = (0, getType_1.default)(value);
        setResult(convertedString);
    }, [value, setResult]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app-wrapper", children: [(0, jsx_runtime_1.jsx)(InputArea_1.default, { value: value, onChange: setValue }), (0, jsx_runtime_1.jsxs)("div", { className: "button-group", children: [(0, jsx_runtime_1.jsx)("button", { className: "btn", onClick: () => format(value), children: "format input text" }), (0, jsx_runtime_1.jsx)("button", { className: "btn", onClick: convert, children: "convert" })] }), (0, jsx_runtime_1.jsx)(OutputArea_1.default, { value: result })] }));
}
exports.default = App;
//# sourceMappingURL=App.js.map