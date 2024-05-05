const express = require('express');
const { getProducts,getProductsIndx} = require('../Controllers/ProductControler');
const router = express.Router();



router.get('/getProducts',getProducts);
router.get(`/getProducts/:index`,getProductsIndx);
module.exports  = router;