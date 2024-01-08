// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../schema/product');

// Tạo sản phẩm mới
router.post('/products', async (req, res) => {
  try {
    const product = await Product.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật sản phẩm
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.deleteProduct(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;