import React, { useState } from "react";
import useSignup from "../hooks/useSignup"; // Import the useSignup hook
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { signup } = useSignup(); // Initialize the signup function from the hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the signup function from the hook
    const { name, email, password, role } = formData;
    await signup(name, email, password, role);

    // Submit the form data to the backend here
    // console.log(formData);

    navigate("/");
    // Use window.location.reload() to trigger a refresh
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-center">Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleNameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleNameInput"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            value={formData.email}
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
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-check-label" htmlFor="exampleSelect">
            Your Role
          </label>
          <select
            name="role"
            className="form-select"
            aria-label="Default select example"
            id="exampleSelect"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="doctor">Doctor</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
