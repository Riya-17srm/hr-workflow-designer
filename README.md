# HR Workflow Designer (React + React Flow)

## Overview

This project is a visual workflow builder designed for HR teams to create and test internal workflows such as onboarding, leave approvals, and document verification.

<img width="936" height="436" alt="hr-workflow" src="https://github.com/user-attachments/assets/a2cf9d6a-6c84-49d3-b819-72bf8fd661fa" />


Users can:

* Drag and drop nodes
* Configure each step dynamically
* Connect steps to form workflows
* Simulate execution of workflows



## Features

* Interactive workflow canvas using React Flow
* Custom node types:

  * Start Node
  * Task Node
  * Approval Node
  * Automated Node
  * End Node
* Dynamic node configuration panel
* Real-time updates (controlled components)
* Workflow simulation engine
* Node and edge deletion support
* Basic validation (start node check, cycle detection)



## Architecture

### State Management

* Centralized state (`nodes`, `edges`) in App component
* Shared across Canvas, NodePanel, and Simulation

### Components

* `Canvas` → handles graph rendering and interactions
* `Sidebar` → drag-and-drop nodes
* `NodePanel` → dynamic forms for node configuration
* `SimulationPanel` → displays execution logs

### Data Model

* Workflow represented as a graph:

  * Nodes → steps
  * Edges → connections

### Simulation Logic

* Traverses workflow starting from Start Node
* Executes steps sequentially
* Generates readable logs


## Tech Stack

* React (Hooks)
* React Flow
* JavaScript (ES6)
* Vite



## How to Run

```bash
npm install
npm run dev
```


## Assumptions

* Single linear workflow path
* No backend persistence (in-memory only)
* First outgoing edge is followed


## Future Improvements

* Branching workflows (conditions)
* Backend integration
* Undo/Redo functionality
* Visual error highlighting
* Workflow export/import (JSON)


## What I Focused On

* Clean architecture and modular design
* Scalable state management
* Dynamic UI rendering
* Functional simulation engine
* Delivering a working prototype within time constraints
