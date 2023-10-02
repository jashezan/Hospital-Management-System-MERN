const express = require("express");
const {
  insertDoctorInfo,
  getDistinctDoctorTypes,
  findDoctorsByType,
} = require("../controllers/doctor.controller");
const docAuth = require("../middlewares/doctor.auth");
const doctorValidate = require("../utils/doctor.validate");

const router = express.Router();

// Route to insert doctor information (Protected, only accessible to "doctor" users)
router.post(
  "/insert-info",
  docAuth, // Protect the route with authentication middleware
  doctorValidate, // Validate user input using express-validator
  insertDoctorInfo
);

// Define the get all doctors route
router.get("/problem-types", getDistinctDoctorTypes);

// Define the get all doctors route
router.get("/doctors-by-type/:speciality", findDoctorsByType);

module.exports = router;
