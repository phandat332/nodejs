// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const Category = require('../schema/category');

// Tạo danh mục mới
router.post('/categories', async (req, res) => {
  try {
    const category = await Category.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật danh mục
router.put('/categories/:id', async (req, res) => {
  try {
    const category = await Category.updateCategory(req.params.id, req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Xóa danh mục
router.delete('/categories/:id', async (req, res) => {
  try {
    const category = await Category.deleteCategory(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;