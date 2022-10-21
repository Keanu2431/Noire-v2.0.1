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
    // const line_items=cart.map((el)=>{})
    // create check out

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/account/orders`,
      cancel_url: `${req.protocol}://${req.get('host')}/cart`,
      customer_email: res.locals.user.emailAddress,
      client_reference_id: '5567',
      line_items: [
        {
          price: 'price_1LvD99DDM79MM6ApnN89rZFA',
          // name: cart[0].name,
          // description: 'desctipyion place holder',
          // images: [
          //   'https://img.ltwebstatic.com/images3_pi/2021/11/16/1637026193d5c88c37d3eade07376dda1b6be2f958_thumbnail_900x.webp',
          // ],
          // amount: cart[0].price * 100,
          // currency: 'usd',
          quantity: cart[0].qty,
        },
        {
          price: 'price_1LvD99DDM79MM6ApnN89rZFA',
          // name: cart[0].name,
          // description: 'desctipyion place holder',
          // images: [
          //   'https://img.ltwebstatic.com/images3_pi/2021/11/16/1637026193d5c88c37d3eade07376dda1b6be2f958_thumbnail_900x.webp',
          // ],
          // amount: cart[0].price * 100,
          // currency: 'usd',
          quantity: cart[0].qty,
        },
      ],
    });
    // send session as res
    res.status(200).json({ status: 'success', session: session });
  } catch (error) {
    console.log(error);
    // console.log(stripe);
    res.status(400).json({
      status: 'fail stripe',
    });
  }
};
