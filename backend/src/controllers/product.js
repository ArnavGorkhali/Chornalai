const Product = require('../models/products');

exports.getAllProducts = async (req, res) => {
  try {
    const pdRes = await Product.find();
    res.json(pdRes);
  } catch (error) {
    console.log(error)
    res.send('Error' + error)
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {category, image, title, description, price} = req.body;
    const product = new Product({
      title,
      description,
      price,
      category,
      image
    });
    const pdRes = await product.save();
    res.json(pdRes);
    
  } catch (error) {
    
  }
}