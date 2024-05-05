const express = require('express');
const { verifyToken, getCart, removeFromCart, cartIncrease, cartDecrease} = require('../Controllers/CartController');
const {addToCart} = require('../Controllers/CartController');
// Create router instance
const router = express.Router();

// Define routes with middleware and controller functions
router.post('/cart', verifyToken, getCart);
router.post('/cart/remove', verifyToken, removeFromCart);
router.post('/cart/decrease', verifyToken, cartDecrease);
router.post('/cart/increase', verifyToken, cartIncrease);
router.post('/cart/add', verifyToken, addToCart);

// Export the router
module.exports = router;