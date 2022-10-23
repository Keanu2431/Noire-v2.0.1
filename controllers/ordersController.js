const User = require('../model/userModel');
const Card = require('../model/cardModel');
const Product = require('../model/productModel');
const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    // getting cart data
    const currUser = res.locals.user;

    const cartData = res.locals.user.userCart;
    let cart = [];
    let subTotal = 0;
    let taxRate = 8.875;
    const Products = await Product.find({});
    for (let i = 0; i < cartData.length; i++) {
      const cartItem = cartData[i];

      const prodDB = Products.filter(
        (el) => el.ProductID === cartItem.ProductID
      )[0];
      const qty = cartItem.qty;
      const images = prodDB.colors.filter((el) => el.color == cartItem.color)[0]
        .images;
      // console.log(cartItem);
      // console.log(prodDB.name);
      const product = {
        qty: cartItem.qty,
        total: Number(cartItem.price) * Number(cartItem.qty),
        ProductID: cartItem.ProductID,
        color: cartItem.color,
        size: cartItem.size,
        images: images,
        name: prodDB.name,
        price: Number(prodDB.price),
        category: prodDB.category,
        subCategory: prodDB.subCategory,
      };
      subTotal += product.total;
      cart.push(product);
    }
    let taxAdd = Math.trunc(subTotal * (taxRate / 100));
    let totalAll = subTotal + taxAdd;

    // stripe info
    //
    // tax rates
    const tax_rate__stripe_NY = await stripe.taxRates.create({
      display_name: 'Sales Tax',
      inclusive: false,
      percentage: 8.875,
      country: 'US',
      state: 'NY',
      jurisdiction: 'US - NY',
      description: 'NY Sales Tax',
      tax_type: 'sales_tax',
    });
    const tax_rate__stripe_CA = await stripe.taxRates.create({
      display_name: 'Sales Tax',
      inclusive: false,
      percentage: 7.25,
      country: 'US',
      state: 'CA',
      jurisdiction: 'US - CA',
      description: 'CA Sales Tax',
      tax_type: 'sales_tax',
    });
    // items
    const checkout_line_items = cart.map((el) => ({
      price_data: {
        currency: 'usd',
        tax_behavior: 'exclusive',
        unit_amount: el.price * 100,
        product_data: {
          name: el.name,
          description: `Comfortable ${el.subCategory.toLowerCase()} to brigthen your day`,
          images: [
            'https://img.ltwebstatic.com/images3_pi/2021/11/16/1637026193d5c88c37d3eade07376dda1b6be2f958_thumbnail_900x.webp',
          ],
        },
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
      quantity: el.qty,
      // dynamic_tax_rates: [],
      dynamic_tax_rates: [tax_rate__stripe_CA.id, tax_rate__stripe_NY.id],
      // tax_rates: [tax_rate__stripe.id],
    }));
    const client_ref_id = `REF_ID_${Math.floor(
      100000000 + Math.random() * 900000000
    )}`;
    // customer
    const primary_ship = currUser.userShipping[0];
    const customer = await stripe.customers.retrieve(currUser.stripeID);

    // await stripe.paymentMethods.attach(paymentMethod.id, {
    //   customer: customer.id,
    // });
    // payyment intent
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: 'off_session',
      amount: Number(totalAll) + 10,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      payment_method: 'pm_card_visa',
      // payment_method: 'pm_1LvTB9DDM79MM6ApoDJkcTfP',
    });
    //
    // shipping
    const ship_countries = ['US', 'CA', 'MX', 'GB'];
    const ship_opt_arr = [
      {
        shipping_rate_data: {
          tax_behavior: 'exclusive',
          display_name: 'Standard',
          type: 'fixed_amount',
          delivery_estimate: {
            maximum: { unit: 'day', value: 7 },
            minimum: { unit: 'day', value: 5 },
          },
          fixed_amount: { amount: 5 * 100, currency: 'usd' },
        },
      },
      {
        shipping_rate_data: {
          tax_behavior: 'exclusive',
          display_name: 'Fast',
          type: 'fixed_amount',
          delivery_estimate: {
            maximum: { unit: 'day', value: 3 },
            minimum: { unit: 'day', value: 2 },
          },
          fixed_amount: { amount: 10 * 100, currency: 'usd' },
        },
      },
    ];

    // create check out
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'us_bank_account'],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/account/orders`,
      cancel_url: `${req.protocol}://${req.get('host')}/cart`,
      // customer_email: res.locals.user.emailAddress,
      client_reference_id: client_ref_id,
      line_items: checkout_line_items,
      shipping_address_collection: { allowed_countries: ship_countries },
      billing_address_collection: 'required',
      // automatic_tax: {
      //   enabled: true,
      // },
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: ship_opt_arr,
      customer: currUser.stripeID,
      // payment_intent: paymentIntent.id,
      payment_intent_data: { setup_future_usage: 'on_session' },
      metadata: {
        user_DB: currUser.userName,
        order_number: `NRE001-${Math.floor(
          100000000 + Math.random() * 900000000
        )}`,
      },
    });
    // send session as res

    res.status(200).json({ status: 'success', session_url: session.url });
  } catch (error) {
    console.log(error);
    // console.log(stripe);
    res.status(400).json({
      status: 'fail stripe',
    });
  }
};
const createOrder = async (session) => {
  // console.log('hellow');
  const sessionInfo = session;
  const metaData = sessionInfo.metadata;
  let shipping_speed;
  if (
    sessionInfo.shipping_address_collection.shipping_cost.shipping_rate ==
    'shr_1LvXbmDDM79MM6ApDi6UAETu'
  )
    shipping_speed = {
      name: 'standard',
      speed: [5, 7],
      cost: 5,
      ship_ref_stripe: 'shr_1LvXbmDDM79MM6ApDi6UAETu',
    };
  else if (
    sessionInfo.shipping_address_collection.shipping_cost.shipping_rate ==
    'shr_1LvXbmDDM79MM6AprltuitPf'
  )
    shipping_speed = {
      name: 'fast',
      speed: [2, 3],
      cost: 10,
      ship_ref_stripe: 'shr_1LvXbmDDM79MM6AprltuitPf',
    };
  const order = {
    order_number: metaData.order_number,
    order__user: metaData.user_DB,
    stripe_order_id: sessionInfo.id,
    subTotal: sessionInfo.amount_subtotal,
    allTotal: sessionInfo.amount_total,
    client_reference_id: sessionInfo.client_reference_id,
    stripe_customer_id: sessionInfo.customer,
    customerInfo: {
      username: metaData.user_DB,
      name: sessionInfo.customer_details.name,
      emailAddress: sessionInfo.customer_details.email,
      phoneNumber: sessionInfo.customer_details.phone,
    },
    shipping_info: {
      shipping_choice: shipping_speed,
      address: {
        ...sessionInfo.shipping_address_collection.shipping_details.address,
        name: sessionInfo.shipping_address_collection.shipping_details.name,
      },
    },
  };
};
exports.stripeCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  const endpointSecret =
    'whsec_f843b3fcfdc680c734c1e6dc50508489080cbfcef50368f293fafc06d2b80c31';
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (err) {
    console.log(err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type == 'checkout.session.completed') {
    createOrder(event.data.object);
  }
  res.status(200).json({ recieved: true });
};
