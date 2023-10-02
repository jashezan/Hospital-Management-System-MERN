import React, { useState, useEffect, useNavigate } from "react";
import AppointmentTable from "../components/AppointmentTable";
import { fetchData, fetchDataAuth } from "../utils/http";

const FutureAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  // const [isDoctor, setIsDoctor] = useState(false); // Replace false with your condition
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user.userType === "doctor") {
  //     setIsDoctor(true);
  //   }
  // }, []);

  // Fetch future appointments for the specific doctor
  useEffect(() => {
    const doctorU = JSON.parse(localStorage.getItem("user")); // Replace with the doctor ID
    const doctorId = doctorU.userId;
    fetchDataAuth
      .get(`/appointment/${doctorId}`) // Replace with your actual API endpoint
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  // if (!isDoctor) {
  //   navigate("/");
  // } else {
  return (
    <div>
      <h1>Future Appointments</h1>
      <AppointmentTable appointments={appointments} />
    </div>
  );
  // }
};

export default FutureAppointment;
