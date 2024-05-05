const mongoose = require('mongoose');
require('dotenv').config();
async function db(){
    await mongoose.connect(process.env.mongoUrl);
    console.log("Mongoose Connected");
}

module.exports  = db();
