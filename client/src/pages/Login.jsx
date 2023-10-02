import React, { useState } from "react";
import useLogin from "../hooks/useLogin"; // Update the path based on your file structure
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useLogin(); // Initialize the login function from the hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uEmail: "",
    uPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the login function from the hook
    const { uEmail, uPassword } = formData;
    await login(uEmail, uPassword);
    // Submit the form data to the backend here
    console.log(formData);

    navigate("/");
    // Use window.location.reload() to trigger a refresh
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="uEmail"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={formData.uEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="uPassword"
            className="form-control"
            id="exampleInputPassword1"
            value={formData.uPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
