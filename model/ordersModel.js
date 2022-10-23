const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  status: String,
  order_date: { type: Object },
  order_number: String,
  order_user: String,
  stripe_order_id: String,
  subTotal: Number,
  allTotal: Number,
  client_reference_id: String,
  stripe_customer_id: String,
  customerInfo: { type: Object },
  shipping_info: { type: Object },
  product_info: Array,
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
