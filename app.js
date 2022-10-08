// look into glob npm for file iteration
// CORE MODULES
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/account'),
  path.join(__dirname, 'views/shop'),
]);
app.set('view engine', 'pug');
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

app.use((req, res, next) => {
  console.log('cookie:');
  next();
});
app.use(cookieParser());
// ROUTES

//
app.use('/', viewsRouter);
app.use('/products', productRouter);
app.use('/shop', shopRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

module.exports = app;
