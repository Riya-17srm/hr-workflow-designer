import React from "react";

export default function SimulationPanel({ logs }) {
  return (
    <div
      style={{
        width: 300,
        borderLeft: "1px solid #ccc",
        padding: 15,
        background: "#111",
        color: "white",
      }}
    >
      <h3>Simulation</h3>

      {logs.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No run yet</p>
      ) : (
        logs.map((log, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              padding: 8,
              background: "#1e1e1e",
              borderRadius: 6,
            }}
          >
            {log}
          </div>
        ))
      )}
    </div>
  );
}