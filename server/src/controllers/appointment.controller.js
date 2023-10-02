const Appointment = require("../models/appointment.model");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const jsDateToSqlDateTime = (jsDate) => {
  const year = jsDate.getFullYear();
  const month = (jsDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = jsDate.getDate().toString().padStart(2, "0");
  const hours = jsDate.getHours().toString().padStart(2, "0");
  const minutes = jsDate.getMinutes().toString().padStart(2, "0");
  const seconds = jsDate.getSeconds().toString().padStart(2, "0");

  // Format the date and time as "YYYY-MM-DD HH:MM:SS"
  const sqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return sqlDateTime;
};

// Controller for creating an appointment
exports.createAppointment = async (req, res) => {
  try {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract appointment data from the request body
    const {
      patientName,
      patientDOB,
      patientProb,
      patientDesc,
      doctorId,
      startTime,
      endTime,
    } = req.body;

    // Create a new appointment instance
    const newAppointment = await Appointment.create({
      patientName,
      patientDOB,
      patientProb,
      patientDesc,
      doctorId, // Assuming the logged-in user is a doctor
      startTime,
      // startTime: jsDateToSqlDateTime(new Date(startTime)),
      endTime,
      // endTime: jsDateToSqlDateTime(new Date(endTime)),
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    // Use Sequelize's findAll method to retrieve all appointments
    const appointments = await Appointment.findAll();

    // Check if there are no appointments
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // Return the appointments as JSON response
    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFutureAppointmentsForDoctor = async (req, res) => {
  try {
    // Extract the doctorId from the URL parameters
    const { doctorId } = req.params;

    // Use Sequelize's findAll method to retrieve future appointments for the specified doctor
    const currentDate = new Date();
    const futureAppointments = await Appointment.findAll({
      where: {
        doctorId,
        startTime: {
          [Op.gte]: currentDate, // Find appointments with startTime greater than or equal to the current date
        },
      },
    });

    // Check if there are no future appointments
    if (!futureAppointments || futureAppointments.length === 0) {
      return res.status(404).json({ message: "No future appointments found for this doctor" });
    }

    // Return the future appointments as JSON response
    return res.status(200).json(futureAppointments);
  } catch (error) {
    console.error("Error fetching future appointments for doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
