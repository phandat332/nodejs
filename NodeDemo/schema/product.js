const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  isdelete: { type: Boolean, default: false },
  order: Number
});

// Thêm phương thức tìm kiếm sản phẩm không bị xóa và sắp xếp
productSchema.statics.findActiveProducts = function() {
  return this.find({ isdelete: false }).sort('order');
};

// Thêm phương thức tạo sản phẩm
productSchema.statics.createProduct = function(productData) {
    return this.create(productData);
};

// Thêm phương thức cập nhật sản phẩm
productSchema.statics.updateProduct = function(productId, updateData) {
    return this.findByIdAndUpdate(productId, updateData, { new: true });
};

// Thêm phương thức đánh dấu xóa sản phẩm
productSchema.statics.deleteProduct = function(productId) {
    return this.findByIdAndUpdate(productId, { isdelete: true }, { new: true });
};

module.exports = mongoose.model('Product', productSchema);