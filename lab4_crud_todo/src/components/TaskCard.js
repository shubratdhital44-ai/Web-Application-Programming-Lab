import React from "react";

function TaskCard({ task, onToggle, onDelete, onEdit, onSave }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      background: "white", border: "1px solid #e5e7eb",
      borderRadius: "10px", padding: "12px 14px", marginBottom: "8px",
      opacity: task.done ? 0.55 : 1, transition: "border-color 0.15s"
    }}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#16a34a" }}
      />

      <span style={{
        width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
        background: task.priority === "high" ? "#E24B4A" : task.priority === "mid" ? "#EF9F27" : "#1D9E75"
      }} />

      {task.editing ? (
        <input
          autoFocus
          type="text"
          value={task.label}
          onChange={(e) => onEdit(task.id, e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSave(task.id)}
          style={{
            flex: 1, fontSize: "14px", border: "none",
            outline: "none", background: "transparent"
          }}
        />
      ) : (
        <span style={{
          flex: 1, fontSize: "14px",
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#9ca3af" : "#111827"
        }}>
          {task.label}
        </span>
      )}

      <div style={{ display: "flex", gap: "4px" }}>
        {task.editing ? (
          <button onClick={() => onSave(task.id)} style={iconBtn}>✓</button>
        ) : (
          <button onClick={() => onEdit(task.id, task.label)} style={iconBtn}>✎</button>
        )}
        <button onClick={() => onDelete(task.id)} style={{ ...iconBtn, color: "#ef4444" }}>✕</button>
      </div>
    </div>
  );
}

const iconBtn = {
  width: "28px", height: "28px", border: "1px solid #e5e7eb",
  borderRadius: "6px", background: "transparent", cursor: "pointer",
  fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center"
};

export default TaskCard;