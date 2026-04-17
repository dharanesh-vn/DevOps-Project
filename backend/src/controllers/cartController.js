const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (cart) {
      res.json(cart);
    } else {
      res.json({ user: req.user._id, cartItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add/Update user cart
// @route   POST /api/cart
// @access  Private
const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.cartItems = cartItems;
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      cart = new Cart({
        user: req.user._id,
        cartItems,
      });
      const createdCart = await cart.save();
      res.status(201).json(createdCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, updateCart };
