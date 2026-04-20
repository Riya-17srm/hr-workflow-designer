import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";
import NodePanel from "./components/NodePanel";
import SimulationPanel from "./components/SimulationPanel";
import { simulateWorkflow } from "./services/api";

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [updateNode, setUpdateNode] = useState(() => {});
  const [deleteNode, setDeleteNode] = useState(() => {}); 
  const [logs, setLogs] = useState([]);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const hasStart = nodes.some((n) => n.type === "start");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <button
          disabled={!hasStart}
          style={{
            padding: 10,
            opacity: hasStart ? 1 : 0.5,
            cursor: hasStart ? "pointer" : "not-allowed",
          }}
          onClick={async () => {
            const result = await simulateWorkflow(nodes, edges);
            setLogs(result);
          }}
        >
          Run Workflow
        </button>

        <Canvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          setSelectedNode={setSelectedNode}
          setUpdateNode={setUpdateNode}
        
        />
      </div>

      <NodePanel
        node={selectedNode}
        updateNode={updateNode}
        deleteNode={deleteNode} 
      />

      <SimulationPanel logs={logs} />

      <DeleteBridge
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
        setSelectedNode={setSelectedNode}
        setDeleteNode={setDeleteNode}
      />
    </div>
  );
}


function DeleteBridge({
  nodes,
  setNodes,
  edges,
  setEdges,
  setSelectedNode,
  setDeleteNode,
}) {
  React.useEffect(() => {
    const fn = (id) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) =>
        eds.filter((e) => e.source !== id && e.target !== id)
      );
      setSelectedNode(null);
    };
    setDeleteNode(() => fn);
  }, [nodes, edges, setNodes, setEdges, setSelectedNode, setDeleteNode]);

  return null;
}