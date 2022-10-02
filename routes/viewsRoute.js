const express = require('express');
const router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

router.get('/', viewsController.renderHome);
router.use(authController.isLoggedIn);
router.get(
  '/account/profile',
  authController.protect,
  viewsController.renderProfile
);
router.get(
  '/account/orders',
  authController.protect,
  viewsController.renderOrders
);
router.get(
  '/account/wishlist',
  authController.protect,
  viewsController.renderWishlist
);
router.get(
  '/account/reset-password',
  authController.protect,
  viewsController.renderResetPass
);
router.get(
  '/account/payment-info',
  authController.protect,
  viewsController.renderPayment
);
router.get(
  '/account/shipping-info',
  authController.protect,
  viewsController.renderShipping
);
router.get(
  '/account/email-preferences',
  authController.protect,
  viewsController.render_E_Pref
);

module.exports = router;
