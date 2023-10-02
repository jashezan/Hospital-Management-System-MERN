const express = require("express");
const empAuth = require("../middlewares/emp.auth");
const {
  createAppointment,
  getAppointment,
  getFutureAppointmentsForDoctor,
} = require("../controllers/appointment.controller");
const appointmentValidate = require("../utils/appointment.validate");

const router = express.Router();

// Route for creating an appointment
router.post(
  "/create-appointment",
  empAuth, // Require authentication to create an appointment
  appointmentValidate,
  createAppointment
);

// Route for getting all appointments
router.get("/get-appointments", getAppointment);

// Route for getting all future appointments for a doctor
router.get("/:doctorId", getFutureAppointmentsForDoctor);

module.exports = router;
