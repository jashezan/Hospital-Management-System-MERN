const { check} = require("express-validator");

const regValidate = [
  // Validation middleware using express-validator
  check('uName', 'Name is required').not().isEmpty(),
  check('uEmail', 'Please include a valid email').isEmail(),
  check('uPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('uType', 'User type must be either "doctor" or "employee"').isIn(['doctor', 'employee']),
]

const loginValidate = [
  // Validation middleware using express-validator
  check('uEmail', 'Please include a valid email').isEmail(),
  check('uPassword', 'Password is required').exists(),
]

module.exports = { regValidate, loginValidate };