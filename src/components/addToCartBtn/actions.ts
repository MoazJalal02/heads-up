"use server"

import { Product } from '@/lib/models/productModel';
import { Cart, CartItem } from '@/lib/models/CartModel';
import { createCart, getCart } from '@/app/cart/actions';
import { revalidatePath } from 'next/cache';
import { cartItem, objectId } from '@/lib/types';

export const addToCart = async (id: objectId, quantity?: number) => {
    const cart = (await getCart()) ?? (await createCart())
    const productInCart = cart.items.some((item) => item.product._id == id);

    console.log("Product in cart: ",productInCart)
    console.log("Quantity: ", quantity)

    if(productInCart){
        await CartItem.updateOne(
            { 'product': id }, 
            { $inc: { quantity: quantity } }
          )
          console.log("Product increased!")
    }
    else {
        const product = await Product.findById(id);

        if (product) {
            const newCartItem = await CartItem.create({
                cart: cart._id,
                product: id,
                quantity: quantity,
            });
            
            await Cart.updateOne(
                { _id: cart._id },
                { $push: { items: newCartItem } }
              );

        } else {
        console.error('Product not found');
        }
    }
    
    revalidatePath("/")
  };
  

export const increment = async (id: string) =>  {
    try{
        await CartItem.updateOne(
            { 'product': id }, 
            { $inc: { quantity: 1 } }
          )
          revalidatePath("/cart")
    }
    catch(err){
        console.log(err)
    }
}

export const decrement  = async (id: string) =>  {
    try{
        const cartItem = await CartItem.findOne({ 'product': id });
        if( cartItem && cartItem.quantity > 1){
            await CartItem.updateOne(
                { 'product': id }, 
                { $inc: { quantity: -1 } }
            )
            revalidatePath("/cart")
        }
    }
    catch(err){
        console.log(err)
    }
}

export const deleteCartItem = async (id: string) =>  {
    try {
        // Find the cart item to be deleted
        const cartItem = await CartItem.findOne({ 'product': id });

        // If the cart item is found, remove it from the cart's items array
        if (cartItem) {
            const cart = await Cart.findById(cartItem.cart);
            if (cart) {
                const updatedItems = cart.items.filter((item : cartItem) => !item._id.equals(cartItem._id));
                cart.items = updatedItems;
                await cart.save(); // Save the cart with the updated items array
            }
        }

        // Delete the cart item from the database
        await CartItem.deleteOne({ 'product': id });

        // Revalidate the "/cart" path
        revalidatePath("/cart");
    }
    catch (err) {
        console.log(err);
    }
}