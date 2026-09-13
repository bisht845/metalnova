const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const filter = req.query.archived === 'true' ? {} : { archived: false };
    res.json(await Product.find(filter).sort({ _id: -1 }));
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.createProduct = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Product name is required' });
    }
    res.status(201).json(await Product.create(req.body));
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.archiveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully', product });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
