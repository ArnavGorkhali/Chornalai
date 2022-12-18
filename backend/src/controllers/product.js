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

exports.addProduct = 
    async (req, res, next) => {
    //   const product = await Product.create(req.body);
    //   console.log(product);
    //   res.status(201).json({
    //     success: true,
    //     product,
    //   });
    // };
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
  }

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

exports.deleteProducts = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
