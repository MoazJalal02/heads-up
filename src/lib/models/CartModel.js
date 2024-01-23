const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CartItem',
        },
      ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, { timestamps: true });

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
}, { timestamps: true });

export const Cart = mongoose.models?.Cart || mongoose.model('Cart', cartSchema);
export const CartItem = mongoose.models?.CartItem || mongoose.model('CartItem', cartItemSchema)