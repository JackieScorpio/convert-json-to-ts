import React from "react";
import "./OutputArea.css";

export default function OutputArea(props: any) {
    const { value } = props;

    return (
        <textarea readOnly className="output-area-wrapper" value={value} />
    )
}