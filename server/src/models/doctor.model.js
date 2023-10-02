const Sequelize = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance
const User = require("./user.model");

const Doctor = sequelize.define(
  "doctor",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true, // Ensure uniqueness
      autoIncrement: true,
    },
    speciality: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    feePerHour: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    yearOfExperience: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
    freezeTableName: true, // Use the exact table name 'doctor' (singular)
  }
);

// Define a foreign key relationship to the "user" table
Doctor.belongsTo(User, { foreignKey: "userId" });

// Sync the model with the database
Doctor.sync()
  .then(() => {
    console.log("Doctor table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Doctor table:", err);
  });

module.exports = Doctor;
