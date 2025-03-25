import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import "./App.css";

const Draggable = ({ id, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="draggable"
    >
      {label}
    </div>
  );
};

const Droppable = ({ children }) => {
  const { setNodeRef } = useDroppable({ id: "drop-area" });

  return (
    <div ref={setNodeRef} className="canvas">
      {children}
    </div>
  );
};

function App() {
  const [elements, setElements] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over?.id === "drop-area") {
      setElements((prev) => [...prev, active.id]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div className="sidebar">
          <Draggable id="header" label="Header" />
          <Draggable id="paragraph" label="Paragraph" />
        </div>
        <Droppable>
          {elements.map((el, i) => (
            <div key={i} className="dropped">
              {el === "header" && <h2>This is a Header</h2>}
              {el === "paragraph" && <p>This is a Paragraph</p>}
            </div>
          ))}
        </Droppable>
      </div>
    </DndContext>
  );
}

export default App;
