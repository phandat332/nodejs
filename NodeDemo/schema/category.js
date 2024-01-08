// schema/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  order: Number,
  isdelete: { type: Boolean, default: false }
});

// Thêm phương thức tìm kiếm danh mục không bị xóa và sắp xếp, kèm sản phẩm
categorySchema.statics.findActiveCategoriesWithProducts = function(Product) {
  return this.find({ isdelete: false })
    .sort('order')
    .populate({
      path: 'products',
      match: { isdelete: false },
      options: { sort: { 'order': 1 } }
    });
};

// Thêm phương thức tạo danh mục
categorySchema.statics.createCategory = function(categoryData) {
    return this.create(categoryData);
};

// Thêm phương thức cập nhật danh mục
categorySchema.statics.updateCategory = function(categoryId, updateData) {
    return this.findByIdAndUpdate(categoryId, updateData, { new: true });
};

// Thêm phương thức xóa danh mục
categorySchema.statics.deleteCategory = function(categoryId) {
    return this.findByIdAndRemove(categoryId);
};

module.exports = mongoose.model('Category', categorySchema);