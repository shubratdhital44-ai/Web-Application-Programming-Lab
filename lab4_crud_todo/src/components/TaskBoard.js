import React from "react";
import TaskCard from "./TaskCard";

function TaskBoard({ tasks, onToggle, onDelete, onEdit, onSave }) {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#9ca3af", padding: "2rem 0", fontSize: "14px" }}>
        No tasks here yet.
      </p>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

export default TaskBoard;