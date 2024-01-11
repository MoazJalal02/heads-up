const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Product = mongoose.models?.Product || mongoose.model('Product', productSchema);
