// look into glob npm for file iteration
// CORE MODULES
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
// stripe reqs
const stripe = require('stripe');

// stripe reqs
const app = express();
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/account'),
  path.join(__dirname, 'views/shop'),
  path.join(__dirname, 'views/admin'),
  path.join(__dirname, 'views/cart'),
]);
app.set('view engine', 'pug');
// SERVING STATIC
app.use(express.static(path.join(__dirname, 'Public')));
const productRouter = require('./routes/productRoutes');

const shopRouter = require('./routes/shopRoute');

const usersRouter = require('./routes/userRoute');

const viewsRouter = require('./routes/viewsRoute');

const accountRouter = require('./routes/accountRoute');

const adminRouter = require('./routes/adminRoute');

const cartRouter = require('./routes/cartRoute');

const orderRouter = require('./routes/ordersRoute');
const ordersController = require('./controllers/ordersController');
// MIDDLEWARE
app.post(
  '/checkout/stripe-webhook-checkout',
  express.raw({ type: 'application/json' }),
  ordersController.stripeCheckout
);

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
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/checkout', orderRouter);

module.exports = app;
