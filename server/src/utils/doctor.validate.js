const { check } = require('express-validator');

const docValidate = [
  // Validation middleware using express-validator
  check("speciality", "Speciality is required").not().isEmpty(),
  check("feePerHour", "Fee per hour must be a positive integer").isInt({
    gt: 0,
  }),
  check(
    "yearOfExperience",
    "Year of experience must be a positive integer"
  ).isInt({ gt: 0 }),
];

module.exports = docValidate;