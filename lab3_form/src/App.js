import React, { useReducer, useState } from "react";
import FormField from "./components/FormField";
import SubmitButton from "./components/SubmitButton";
import "./styles/App.css";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function validate(fields, isSignup) {
  const errors = {};
  if (isSignup && !fields.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (!fields.email.includes("@")) {
    errors.email = "Enter a valid email address.";
  }
  if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (e) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, isSignup);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert(`${isSignup ? "Registered" : "Logged in"} as: ${formData.email}`);
      dispatch({ type: "RESET" });
      setSubmitted(false);
    }, 800);
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setErrors({});
    dispatch({ type: "RESET" });
  };

  return (
    <div className="page-wrapper">
      <div className="auth-card">

        <div className="card-header">
          <div className="brand-icon">✦</div>
          <h1 className="card-title">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="card-subtitle">
            {isSignup ? "Sign up to get started" : "Sign in to continue"}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {isSignup && (
            <FormField
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Your Valid Name"
              value={formData.fullName}
              onChange={handleFieldChange}
              error={errors.fullName}
            />
          )}

          <FormField
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleFieldChange}
            error={errors.email}
          />

          <FormField
            label="Password"
            type="password"
            name="password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleFieldChange}
            error={errors.password}
          />

          <SubmitButton label={isSignup ? "Create Account" : "Sign In"} loading={submitted} />

        </form>

        <div className="card-footer">
          <span className="footer-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button type="button" className="link-btn" onClick={toggleMode}>
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;