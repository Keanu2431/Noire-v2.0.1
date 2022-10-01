// look into glob npm for file iteration
// CORE MODULES
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

const productRouter = require('./routes/productRoutes');

const shopRouter = require('./routes/shopRoute');

const usersRouter = require('./routes/userRoute');

const accountRouter = require('./routes/accountRoute');
// MIDDLEWARE
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(express.json());
// parses the data from cookie
app.use(cookieParser());
app.get('/account', (req, res, next) => {
  //   console.log(__dirname + '/Public/account/prfile.html');
  //   file:///C:/Users/Keanu/Desktop/Programing/Projects/Web%20Dev/Sites/Noire-v2.0.1/Public/account/profile.html
  res.sendFile(`${__dirname}/Public/account/profile.html`);
  next();
});
app.use((req, res, next) => {
  console.log('parser');
  console.log(req.cookies);
  next();
});
// ROUTES
app.use('/products', productRouter);
app.use('/shop', shopRouter);
app.use('/users', usersRouter);
// app.use('/account', accountRouter);

module.exports = app;
