const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Appointment = sequelize.define(
  "appointment",
  {
    appId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    patientName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    patientDOB: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    patientProb: {
      type: Sequelize.STRING(255),
    },
    patientDesc: {
      type: Sequelize.STRING(2000),
    },
    doctorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isFuture: function (value) {
          // Check if start_time is in the future
          if (value <= new Date()) {
            throw new Error(
              "start_time must be greater than the current date and time"
            );
          }
        },
      },
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isFuture: function (value) {
          // Check if end_time is in the future
          if (value <= new Date()) {
            throw new Error(
              "end_time must be greater than the current date and time"
            );
          }
        },
      },
    },
  },
  {
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
    freezeTableName: true, // Use the exact table name 'appointment' (singular)
  }
);

// Sync the model with the database
Appointment.sync()
  .then(() => {
    console.log("Appointment table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Appointment table:", err);
  });

module.exports = Appointment;
