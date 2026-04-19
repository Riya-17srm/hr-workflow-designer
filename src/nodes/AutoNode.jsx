import React from "react";
import { Handle, Position } from "reactflow";

export default function AutoNode({ data }) {
  return (
    <div style={{ padding: 10, border: "2px solid purple", borderRadius: 8 }}>
      <strong>Auto</strong>
      <div>{data.label}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}