// look into glob npm for file iteration
// CORE MODULES
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const braRouter = require('./routes/braRoutes');
const usersRouter = require('./routes/userRoute');
// MIDDLEWARE
// app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(express.json());

// ROUTES

app.use('/products', braRouter);
app.use('/users', usersRouter);

module.exports = app;
