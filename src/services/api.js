export const simulateWorkflow = async (nodes, edges) => {
  await new Promise((res) => setTimeout(res, 500));

  if (!nodes.length) return ["No nodes in workflow"];

  const startNodes = nodes.filter((n) => n.type === "start");

  if (startNodes.length === 0)
    return ["No Start Node found"];

  if (startNodes.length > 1)
    return ["Multiple Start Nodes not allowed"];

  const result = [];
  let current = startNodes[0];
  const visited = new Set();

  while (current) {
    if (visited.has(current.id)) {
      result.push("Cycle detected");
      break;
    }

    visited.add(current.id);

   
    switch (current.type) {
      case "start":
        result.push("Workflow Started");
        break;

      case "task":
        result.push(
          `Task: ${current.data?.title || "Untitled Task"} (Assigned to: ${
            current.data?.assignee || "N/A"
          })`
        );
        break;

      case "approval":
        result.push(
          `Approval by ${
            current.data?.role || "Unknown Role"
          }`
        );
        break;

      case "auto":
        result.push(
          `Automated Action: ${
            current.data?.action || "No Action"
          }`
        );
        break;

      case "end":
        result.push(
          `Workflow Ended: ${
            current.data?.message || "Completed"
          }`
        );
        return result;

      default:
        result.push(`${current.type}`);
    }

    const nextEdge = edges.find((e) => e.source === current.id);
    if (!nextEdge) {
      result.push("Flow ended unexpectedly");
      break;
    }

    current = nodes.find((n) => n.id === nextEdge.target);
  }

  return result;
};