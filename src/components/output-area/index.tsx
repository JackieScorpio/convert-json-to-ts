import React from "react";

import "./index.css";

export default function OutputArea(props: any) {
    const { value } = props;

    return (
        <textarea
            style={{ width: "90%", height: "40vh" }}
            readOnly
            className="output-area-wrapper" 
            value={value}
        />
    )
}