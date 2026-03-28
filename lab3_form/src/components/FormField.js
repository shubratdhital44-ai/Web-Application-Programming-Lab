import React from "react";
import "../styles/FormField.css";

function FormField({ label, type, name, placeholder, value, onChange, error }) {
  return (
    <div className={`field-wrapper ${error ? "field-wrapper--error" : ""}`}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="field-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default FormField;