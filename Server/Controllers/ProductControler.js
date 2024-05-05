const products = require('../product');

exports.getProducts = async(req,res) =>{
    res.json(products);
}

exports.getProductsIndx = async(req,res) =>{
    const index = parseInt(req.params.index); 
    if(index < 0 || index >= products.products.length){
        res.status(404).json({ error: 'Product not found' });
    }
    res.json(products.products[index]);
}


