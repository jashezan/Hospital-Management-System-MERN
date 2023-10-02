const { validationResult } = require("express-validator");
const sequelize = require("../config/db"); // Import your Sequelize instance
const Doctor = require("../models/doctor.model");

// Controller to insert doctor information
exports.insertDoctorInfo = async (req, res) => {
  try {
    // Check if the user is authenticated as a "doctor"
    if (req.user.userType !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can insert doctor information." });
    }

    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract doctor information from the request body
    const { speciality, feePerHour, yearOfExperience } = req.body;

    // Insert the doctor information into the doctor table
    const newDoctor = await Doctor.create({
      speciality,
      feePerHour,
      yearOfExperience,
      userId: req.user.userId, // Associate the doctor with the logged-in user
    });

    return res
      .status(201)
      .json({
        message: "Doctor information inserted successfully.",
        doctor: newDoctor,
      });
  } catch (error) {
    console.error("Error inserting doctor information:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDistinctDoctorTypes = async (req, res) => {
  try {
    // Use Sequelize's distinct method to retrieve distinct speciality values
    const distinctTypes = await Doctor.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("speciality")), "speciality"],
      ],
    });

    if (distinctTypes && distinctTypes.length > 0) {
      const types = distinctTypes.map((type) => type.dataValues.speciality);
      return res.status(200).json({ types });
    } else {
      return res.status(404).json({ message: "No distinct types found" });
    }
  } catch (error) {
    console.error("Error fetching distinct doctor types:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.findDoctorsByType = async (req, res) => {
  const { speciality } = req.params; // Extract speciality from URL parameters

  try {
    const doctors = await Doctor.findAll({
      where: {
        speciality: speciality, // Filter by speciality
      },
    });

    if (doctors && doctors.length > 0) {
      // console.log( doctors);
      return res.status(200).json({ doctors });
    } else {
      return res
        .status(404)
        .json({ message: "No doctors found for the specified speciality" });
    }
  } catch (error) {
    console.error("Error finding doctors by speciality:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
