const { check } = require('express-validator');

const appValidate = [
  // Add validation rules for appointment creation
  check('patientName').notEmpty().withMessage('Patient name is required'),
  check('patientDOB').notEmpty().withMessage('Patient date of birth is required'),
  check('startTime').notEmpty().isISO8601().withMessage('Invalid start time format'),
  check('endTime').notEmpty().isISO8601().withMessage('Invalid end time format'),
]

module.exports = appValidate;