const User = require("../Models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtKey = process.env.jwtKey;

exports.createUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, name, and password are required.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', email: newUser.email });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        const token = jwt.sign({ userId: existingUser.email, name: existingUser.name }, jwtKey, { expiresIn: "24h" });
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
        return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
exports.logout = async (req,res) =>{
    console.log("OUT");
    res.clearCookie('token')
    
    res.status(200).send({ message: 'Logout successful' });
    
      // Redirect to a login or home page
}
exports.Check = async (req, res, next) => {
    console.log("Hello");
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        
        const decoded = await jwt.verify(token, jwtKey);
        
        const email = decoded.userId;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).send('User not found');
        }
        return res.json({user})
    
    } catch (error) {
        console.log(error);
        return res.status(403).send('Forbidden');
    }
};
