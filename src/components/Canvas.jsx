import React, { useCallback, useRef } from "react";
import StartNode from "../nodes/StartNode";
import TaskNode from "../nodes/TaskNode";
import ApprovalNode from "../nodes/ApprovalNode";
import AutoNode from "../nodes/AutoNode";
import EndNode from "../nodes/EndNode";

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";


const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  auto: AutoNode,
  end: EndNode,
};

let id = 0;
const getId = () => `node_${id++}`;

export default function Canvas() {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");

    const position = {
      x: event.clientX - 250,
      y: event.clientY - 50,
    };

    const newNode = {
      id: getId(),
      type: type,
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
    </div>
  );
}