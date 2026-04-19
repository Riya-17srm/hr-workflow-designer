import React from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Canvas />
    </div>
  );
}