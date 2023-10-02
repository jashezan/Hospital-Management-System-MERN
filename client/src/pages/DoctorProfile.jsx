import React, { useState, useEffect, useContext } from "react";
import { fetchData, fetchDataAuth } from "../utils/http";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection

const DoctorProfile = () => {
  const [isDoctor, setIsDoctor] = useState(false); // Replace false with your condition
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.userType === "doctor") {
      setIsDoctor(true);
    }
  }, []);
  const [formData, setFormData] = useState({
    speciality: "",
    feePerHour: 0,
    yearOfExperience: 0,
  });
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
      .post("/doctor/insert-info", formData)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        window.location.reload();
      })
      .catch((error) => console.error("Error inserting info:", error));

    // Submit the form data to the backend here
    // console.log(formData);
  };
  
  if(!isDoctor){
    navigate("/")
  }else{
    return (
      <div>
        <h1 className="text-center">Insert Information about Yourself</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleNameInput" className="form-label">
              Your Speciality
            </label>
            <input
              type="text"
              className="form-control"
              name="speciality"
              id="exampleNameInput"
              value={formData.speciality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Fee Per Hour
            </label>
            <input
              type="number"
              name="feePerHour"
              className="form-control"
              id="exampleInputEmail1"
              value={formData.feePerHour}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Year of Experience
            </label>
            <input
              type="number"
              name="yearOfExperience"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.yearOfExperience}
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
  }
};

export default DoctorProfile;
