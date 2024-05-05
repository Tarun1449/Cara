const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT module
const db = require('./Config/config');
const app = express();
const path = require('path');
const userRoutes = require('./Routes/Auth');
const cartRoutes = require('./Routes/cart');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const proRoutes = require('./Routes/Products');
const User = require('./Models/userModel');
const Order  =require('./Models/orderModel');
app.use(cookieParser({

}));
app.use(cors({
    origin:["https://caraexpress.onrender.com"],
    credentials:true,
    methods:["GET","POST"]
}));    
app.use(bodyParser.json());

// Define secret key for JWT token
const secretKey = process.env.jwtKey; // Change this to a secure secret key

const dir = path.dirname("");

app.use(express.static(path.join(dir,"../cart/build")));

db;
app.use('/api', userRoutes);
app.use('/api', proRoutes);
app.use('/api',cartRoutes);
// Middleware to verify JWT token
async function verifyToken(req, res, next) {
    console.log(req.headers);
    const token = req.cookies.token;
    console.log("done");
    console.log(token); // Extract token from the HTTP-only cookie named 'token'
    
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



app.post('/api/makeOrders', verifyToken, async (req, res) => {
    
    try {
        const email = req.userId;
        
        // Check if all required fields are present in the request body
        const { name, address, city, postalCode, products, date ,state,total} = req.body.shippingData;
        
        if (!name || !email || !address || !city || !postalCode || !products || !date||!state ||!total|| products.length === 0) {
            return res.status(400).json({ message: `Fill all required fields` });
        }

        // Create a new Order document based on the request body
        const newOrder = new Order({ name, address, city, postalCode, products, date,state,total });
        
        const savedOrder = await newOrder.save();
        const orderId = savedOrder._id;
        const orderIdObject =  new mongoose.Types.ObjectId(orderId);
        
        // Find the user and update their cart and orders
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Clear the cart and add the new order to the orders array
        user.cart = [];
        
        user.orders.push({ name, address, city, postalCode, products, date,state, id: orderIdObject,total});
        user.markModified('orders');
        
        await user.save();
        // Respond with the aved order
        res.status(201).json({order :savedOrder , cart:user.cart});
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
});
app.get('/api/previousOrders', verifyToken, async (req, res) => {
    try {
        const email = req.userId;
        const user = await User.findOne({email});
        const orders = user.orders;
        res.status(201).json({orders});
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cart/build', 'index.html'));
});
app.post('/api/details',verifyToken,async (req,res)=>{
    const email = req.userId;
    const existingUser = await User.findOne({email});
    console.log(existingUser);
    res.status(201).json({email,name : existingUser.name});
})




app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
});
