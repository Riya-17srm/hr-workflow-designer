import React from "react";

export default function NodePanel({ node, updateNode, deleteNode }) {
  if (!node) {
    return (
      <div style={{ width: 260, padding: 15 }}>
        Select a node
      </div>
    );
  }

  const handleChange = (field, value) => {
    updateNode(node.id, { [field]: value });
  };

  const confirmDelete = () => {
    if (window.confirm("Delete this node? This will remove its connections.")) {
      deleteNode(node.id);
    }
  };

  return (
    <div
      style={{
        width: 260,
        padding: 15,
        borderLeft: "1px solid #ccc",
        background: "#111",
        color: "white",
      }}
    >
      <h3 style={{ textTransform: "capitalize" }}>
        Edit {node.type} Node
      </h3>

      {/* Common */}
      <div style={{ marginBottom: 10 }}>
        <label>Label</label>
        <input
          style={{ width: "100%" }}
          value={node.data?.label || ""}
          onChange={(e) => handleChange("label", e.target.value)}
        />
      </div>

   
      {node.type === "task" && (
        <>
          <div style={{ marginBottom: 10 }}>
            <label>Title</label>
            <input
              style={{ width: "100%" }}
              value={node.data?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Assignee</label>
            <input
              style={{ width: "100%" }}
              value={node.data?.assignee || ""}
              onChange={(e) => handleChange("assignee", e.target.value)}
            />
          </div>
        </>
      )}

      
      <button
        onClick={confirmDelete}
        style={{
          marginTop: 16,
          width: "100%",
          padding: 10,
          background: "#c0392b",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Delete Node
      </button>
    </div>
  );
}