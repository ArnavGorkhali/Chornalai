const Product = require("../models/products");
const Image = require("../models/Image");

exports.getAllProducts = async (req, res) => {
  try {
    const pdRes = await Product.find({}).sort({"updatedAt": 'desc'});
    res.json(pdRes);
  } catch (error) {
    console.log(error);
    res.send("Error" + error);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { category, image, title, description, price } = req.body;
    const imgUrl = await Image.findOne({
      _id: image
    });
    console.log(imgUrl);

    const imgPath = req.protocol + '://' + req.get('host') + "/" + imgUrl.name
    const product = new Product({
      title,
      description,
      price,
      category,
      image: imgPath,
    });
    const pdRes = await product.save();
    res.json(pdRes);
  } catch (error) {}
};

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = await Product.findOne({
      _id: productId
    });

    if(productDetails) {
      console.log(productDetails, productId)
      res.json(productDetails);
    } else {
      throw new Error('product not found' + ' -> ' + productId)
    }
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
};
