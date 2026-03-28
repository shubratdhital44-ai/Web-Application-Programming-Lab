import React, { useState } from "react";
import TaskBoard from "./components/TaskBoard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("mid");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTasks([
      { id: Date.now(), label: inputValue.trim(), done: false, editing: false, priority },
      ...tasks,
    ]);
    setInputValue("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const editTask = (id, value) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, label: value, editing: true } : t)));

  const saveTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, editing: false } : t)));

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const remaining = total - done;

  return (
    <div style={{ maxWidth: "520px", margin: "40px auto", padding: "0 16px", fontFamily: "sans-serif" }}>

      {/* Header */}
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>My Tasks</h2>
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {[["Total", total], ["Completed", done], ["Remaining", remaining]].map(([label, val]) => (
          <div key={label} style={{
            flex: 1, background: "#f9fafb", borderRadius: "8px", padding: "10px 12px"
          }}>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>{val}</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          style={{ flex: 1 }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ fontSize: "13px", borderRadius: "6px", border: "1px solid #e5e7eb", padding: "0 8px" }}
        >
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
        {["all", "active", "done"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontSize: "12px", padding: "4px 12px", borderRadius: "6px", cursor: "pointer",
              border: "1px solid", borderColor: filter === f ? "#d1d5db" : "transparent",
              background: filter === f ? "#f3f4f6" : "transparent",
              fontWeight: filter === f ? "600" : "400",
              color: filter === f ? "#111827" : "#6b7280",
              textTransform: "capitalize"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <TaskBoard
        tasks={filtered}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        onSave={saveTask}
      />
    </div>
  );
}

export default App;