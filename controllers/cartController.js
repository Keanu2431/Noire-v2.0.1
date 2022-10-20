const User = require('./../model/userModel');
const Product = require('./../model/productModel');
exports.renderCart = async (req, res, next) => {
  const cartData = res.locals.user.userCart;
  let cart = [];
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
    cart.push(product);
  }
  //   console.log(cart);
  res.status(200).render('cart', { cartItems: cart });
};
// exports.me = (req, res, next) => {
//   res.status(200).render('cart');
// };
