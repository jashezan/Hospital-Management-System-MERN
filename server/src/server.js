// importing npm packages
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// importing routes
const doctorRouter = require('./routes/doctor.route');
const userRouter = require('./routes/user.route');
const appointmentRouter = require("./routes/appointment.route");

// importing database connection
// const  connectDB = require('./config/database');

// configuring dotenv for environment variables
dotenv.config();

// initializing express app
const app = express();

const port = process.env.PORT || 8000;

// builtin middlewares
app.use(express.json());
app.use(morgan('dev'));

// setting cors headers
app.use(cors());

// custom middlewares
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);

// starting server
app.listen(port, (err) => {
  if(err){
    console.log(err);
    process.exit(1);
  }
  console.log(`\nServer running on port ${port}\n`);
});