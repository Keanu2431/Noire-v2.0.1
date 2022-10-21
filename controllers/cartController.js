const User = require('./../model/userModel');
const Product = require('./../model/productModel');
exports.renderCart = async (req, res, next) => {
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
  res
    .status(200)
    .render('cart', { cartItems: cart, subTotal, taxRate, taxAdd, totalAll });
};
exports.removeItem = async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    const pid = req.body.pid;
    console.log(userId);
    const cartDelete = await User.findByIdAndUpdate(
      userId,
      { $pull: { userCart: { ProductID: pid } } },
      { new: true }
    );
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
// exports.me = (req, res, next) => {
//   res.status(200).render('cart');
// };
// $pull: { userCards: delCard },
