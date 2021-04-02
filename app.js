const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const userRouter = require(`${__dirname}/routes/userRoutes`);
const morgan = require('morgan');

//! Sample Middleware
app.use((req, res, next) => {
  console.log('Hello from EventHorz Middleware!');
  next();
});

//! To get the time of request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! Morgan to check request Status
app.use(morgan('dev'));

//! body Parser or JSON parser
app.use(express.json());

//! Sample Dummy Route
app.route('/').get((req, res) => {
  res.send('<h1>This server is working for EventHorz!</h1>');
});

//! Main Application Routes
app.use('/api/v1/users', userRouter);

module.exports = app;
