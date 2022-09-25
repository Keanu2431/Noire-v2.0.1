// look into glob npm for file iteration
// CORE MODULES
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const productRouter = require('./routes/productRoutes');
const usersRouter = require('./routes/userRoute');
// MIDDLEWARE
// app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(express.json());

// ROUTES

app.use('/products', productRouter);
app.use('/users', usersRouter);

module.exports = app;
