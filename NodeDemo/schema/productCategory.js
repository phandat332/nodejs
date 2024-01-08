// schema/productCategory.js
const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  }
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);