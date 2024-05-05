const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  orderStatus: {
    type: String,
    default: 'confirm', // Default value 'confirm'
  },
  address: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  date: {
    type: String,
    
  },
  name: {
    type: String,
    
  },
  postalCode: {
    type: String,
    
  },
  products: [{}],
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
