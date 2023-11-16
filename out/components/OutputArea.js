"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./OutputArea.css");
function OutputArea(props) {
    const { value } = props;
    return ((0, jsx_runtime_1.jsx)("textarea", { readOnly: true, className: "output-area-wrapper", value: value }));
}
exports.default = OutputArea;
//# sourceMappingURL=OutputArea.js.map