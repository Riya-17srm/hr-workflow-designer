import React from "react";
import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div style={{ padding: 10, border: "2px solid red", borderRadius: 8 }}>
      <strong>End</strong>
      <div>{data.label}</div>

      {/* Only input */}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}