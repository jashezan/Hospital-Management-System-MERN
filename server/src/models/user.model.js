const Sequelize = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance

const User = sequelize.define(
  "user",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true, // Ensure uniqueness
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    userEmail: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    userPassword: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    // New column
    userType: {
      type: Sequelize.ENUM("doctor", "employee"),
      allowNull: false,
    },
  },
  {
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
    freezeTableName: true, // Use the exact table name 'user' (singular)
  }
);

// Sync the model with the database
User.sync()
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating User table:", err);
  });

module.exports = User;
