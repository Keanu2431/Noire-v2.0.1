// look into glob npm for file iteration
// CORE MODULES
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// SERVING STATIC
app.use(express.static(path.join(__dirname, 'Public')));
const productRouter = require('./routes/productRoutes');

const shopRouter = require('./routes/shopRoute');

const usersRouter = require('./routes/userRoute');

const viewsRouter = require('./routes/viewsRoute');

const accountRouter = require('./routes/accountRoute');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// parses the data from cookie
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('parser');
  console.log(req.cookies);
  next();
});
// ROUTES

//
app.use('/', viewsRouter);
app.use('/products', productRouter);
app.use('/shop', shopRouter);
app.use('/users', usersRouter);
// app.use('/account', accountRouter);

module.exports = app;
