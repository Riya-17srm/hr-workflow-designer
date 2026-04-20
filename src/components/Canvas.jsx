import React, { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "../nodes/StartNode";
import TaskNode from "../nodes/TaskNode";
import ApprovalNode from "../nodes/ApprovalNode";
import AutoNode from "../nodes/AutoNode";
import EndNode from "../nodes/EndNode";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  auto: AutoNode,
  end: EndNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export default function Canvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  setSelectedNode,
  setUpdateNode,
}) {
  const reactFlowWrapper = useRef(null);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const onNodesDelete = (deletedNodes) => {
    const deletedIds = deletedNodes.map((n) => n.id);

    setEdges((eds) =>
      eds.filter(
        (e) => !deletedIds.includes(e.source) && !deletedIds.includes(e.target)
      )
    );

    setSelectedNode(null);
  };

  const updateNode = (id, newData) => {
    setNodes((nds) => {
      const updated = nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
      );

      const updatedNode = updated.find((n) => n.id === id);
      setSelectedNode(updatedNode);

      return updated;
    });
  };

  useEffect(() => {
    setUpdateNode(() => updateNode);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("application/reactflow");

    const position = {
      x: e.clientX - 250,
      y: e.clientY - 50,
    };

    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: type },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        deleteKeyCode={["Backspace", "Delete"]} 
        nodesFocusable={true} 
        elementsSelectable={true} 
      />
    </div>
  );
}