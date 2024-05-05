const User = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secretKey =process.env.jwtKey; 

exports.verifyToken = async(req,res,next)=>{
    
    const token = req.cookies.token;
    
    
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.userId;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        // Attach user information to request object
        req.userId = decoded.userId;
        
        next();

    } catch (error) {
        
        return res.status(403).send('Forbidden');
    }
}
exports.getCart = async(req,res)=>{
    
    const  email  = req.userId;
    
    const user = await User.findOne({ email });
    
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (user.cart) {
        const cart = user.cart;
       
        return res.status(200).json({ cart: cart });
    }
}
exports.addToCart = async(req,res)=>{

    try {
        const  email  = req.userId;
        const { product, quantity } = req.body;
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        let existingCartItemIndex = user.cart.findIndex(item => item.product.id === product.id);
        if (existingCartItemIndex !== -1) {
            user.cart[existingCartItemIndex].quantity += quantity;
        } else {
            user.cart.push({ product, quantity });
        }
    
        
        user.markModified('cart');
    
        await user.save();
    
       
    
        res.status(200).json({ message: 'Item added to cart successfully', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.cartIncrease = async(req,res)=>{
    try {   
        const { productId, quantity } = req.body;
        const email = req.userId;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItem = user.cart.find(item => item.product.id === productId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        cartItem.quantity += quantity;
        user.markModified('cart');
        await user.save();

        res.status(200).json({ message: 'Quantity increased successfully', cart: user.cart });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

exports.cartDecrease = async(req,res)=>{
    try {
        const { productId, quantity } = req.body;
        const email = req.userId;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cartItem = user.cart.find(item => item.product.id === productId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        if (cartItem.quantity <= quantity) {
            user.cart = user.cart.filter(item => item.product.id !== productId);
        } else {
            cartItem.quantity -= quantity;
        }

        user.markModified('cart');
        await user.save();

        res.status(200).json({ message: 'Quantity decreased successfully', cart: user.cart });
    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.removeFromCart = async(req,res)=>{
    try {
        const { productId } = req.body;
        const email = req.userId;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.cart = user.cart.filter(item => item.product.id !== productId);
        user.markModified('cart');
        await user.save();
        
        res.status(200).json({ message: 'Product removed from cart successfully', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
