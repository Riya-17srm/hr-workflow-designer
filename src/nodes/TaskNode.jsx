import React from "react";
import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div style={{ padding: 10, border: "2px solid blue", borderRadius: 8 }}>
      <strong>Task</strong>
      <div>{data.label}</div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom}  
/>
    </div>
  );
}