import React, { useState, useEffect, useContext } from "react";
import { fetchData, fetchDataAuth } from "../utils/http";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection

const Appointments = () => {
  const [isEmployee, setIsEmployee] = useState(false); // Replace false with your condition
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.userType === "employee") {
      setIsEmployee(true);
    } else {
      navigate("/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    patientName: "",
    patientDOB: "",
    patientProb: "",
    doctorId: "",
    patientDesc: "",
    startTime: "",
    endTime: "",
  });

  // Fetch problems from http://localhost:8000/problems
  useEffect(() => {
    fetchData("/doctor/problem-types")
      .then((response) => response.data)
      .then((data) => {
        setFormData({
          ...formData,
          problems: data.types,
        });
      })
      .catch((error) => console.error("Error fetching problems:", error));
  }, []);

  // Fetch doctors based on selected problem
  useEffect(() => {
    if (formData.patientProb) {
      fetchData(`/doctor/doctors-by-type/${formData.patientProb}`)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // console.log(data);
          setFormData({
            ...formData,
            doctors: data.doctors,
          });
        })
        .catch((error) => console.error("Error fetching doctors:", error));
    } else {
      // Clear the doctor list when no problem is selected
      setFormData({
        ...formData,
        doctors: [],
      });
    }
  }, [formData.patientProb]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchDataAuth
      .post("/appointment/create-appointment", formData)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        window.location.reload();
      })
      .catch((error) => console.error("Error creating appointment:", error));

    // Submit the form data to the backend here
    // console.log(formData);
  };

  return (
    <div className="">
      <h1 className="text-center">Make an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleNameInput" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            className="form-control"
            id="exampleNameInput"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Patient's Date of Birth</label>
          <input
            className="form-control"
            type="date"
            name="patientDOB"
            value={formData.patientDOB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select a Problem:</label>
          <select
            className="form-control"
            name="patientProb"
            value={formData.patientProb}
            onChange={handleChange}
            required
          >
            <option value="">Select a problem</option>
            {formData.problems?.map((problem) => (
              <option key={problem} value={problem} className="text-capitalize">
                {problem}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="floatingTextarea">Patient Problem Description</label>
          <textarea
            name="patientDesc"
            className="form-control"
            placeholder="Describe Problem of Patient here..."
            id="floatingTextarea"
            value={formData.patientDesc}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Select a Doctor:</label>
          <select
            className="form-control"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a doctor
            </option>
            {formData.doctors?.map((doctor) => (
              <option
                key={doctor.userId}
                value={doctor.userId}
                className="text-capitalize"
              >
                {doctor.userId}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Appointment Start Time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Appointment End Time</label>
          <input
            className="form-control"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Appointments;
