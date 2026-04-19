import React from "react";

const nodeTypes = [
  { type: "start", label: "Start" },
  { type: "task", label: "Task" },
  { type: "approval", label: "Approval" },
  { type: "auto", label: "Automated" },
  { type: "end", label: "End" },
];

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ width: 200, padding: 10, borderRight: "1px solid #ccc" }}>
      <h3>Nodes</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          style={{
            padding: 10,
            marginBottom: 10,
            border: "1px solid #999",
            cursor: "grab",
          }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}