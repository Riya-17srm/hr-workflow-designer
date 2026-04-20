import React from "react";
import { Handle, Position } from "reactflow";

export default function StartNode({ data }) {
  return (
    <div style={{ padding: 10, border: "2px solid green", borderRadius: 8 }}>
      <strong>Start</strong>
      <div>{data.label}</div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}