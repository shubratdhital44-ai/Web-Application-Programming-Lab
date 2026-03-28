import React from "react";
import "../styles/SubmitButton.css";

function SubmitButton({ label, loading }) {
  return (
    <button
      type="submit"
      className={`submit-btn ${loading ? "submit-btn--loading" : ""}`}
      disabled={loading}
    >
      {loading ? <span className="spinner" /> : label}
    </button>
  );
}

export default SubmitButton;