"use server"

import { Product } from '@/lib/models/productModel';
import { Cart, CartItem } from '@/lib/models/CartModel';
import { createCart, getCart } from '@/app/cart/actions';
import { revalidatePath } from 'next/cache';

export const addToCart = async (id: string) => {
    const cart = (await getCart()) ?? (await createCart())
    const productInCart = cart.items.some((item) => item.product._id == id);

    if(productInCart){
        await CartItem.updateOne(
            { 'product': id }, 
            { $inc: { quantity: 1 } }
          )
    }
    else {
        const product = await Product.findById(id);

        if (product) {
            const newCartItem = await CartItem.create({
                cart: cart._id,
                product: id,
                quantity: 1,
            });
            
            const shopCart = await Cart.findById(cart._id)

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
        await CartItem.deleteOne({ 'product': id });
        revalidatePath("/cart");
    }
    catch (err) {
        console.log(err);
    }
}