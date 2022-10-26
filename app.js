// look into glob npm for file iteration
// CORE MODULES
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
// set http security heeaders
const helmet = require('helmet');
// rate limit
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request',
});
// limit
const app = express();
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/account'),
  path.join(__dirname, 'views/shop'),
  path.join(__dirname, 'views/admin'),
  path.join(__dirname, 'views/cart'),
  path.join(__dirname, 'views/orders'),
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
// CORS
app.use(cors());
app.options('*', cors());
// Access-Control-Allow-Origin
// allows other sites to use my api if i list them
app.use(cors({ origin: 'http://127.0.0.1:3000' }));
//
app.use('*', limiter);
// app.use(helmet());
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
app.use('*', function (req, res, next) {
  res.status(404).render('404_page');
  next();
});
module.exports = app;
