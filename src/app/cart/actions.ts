"use server"

import { connectToDb } from '@/lib/dbConnect'
import { Cart,CartItem } from '@/lib/models/CartModel'
import { cookies } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import type { cartItem, shoppingCart } from '@/lib/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export async function getCart(): Promise<shoppingCart | null > {
    connectToDb()
    noStore()

    const session = await getServerSession(authOptions)
    const userId = session?.user.id;

    let cart

    if (userId){
        cart = await Cart.findOne({ "userId": `${userId}` }).populate({
            path: 'items',
            populate: { path: 'product' } // Populate the 'product' field in each 'CartItem'
        })
    } else {
        const localCartId = cookies().get("localCartId")?.value
        cart = localCartId?
            await Cart.findById(localCartId).populate({
                path: 'items',
                populate: { path: 'product' } // Populate the 'product' field in each 'CartItem'
              })
            : null
        }
        
    if(!cart){
        return null
    }
    
    return {
        ...cart._doc,
        size: cart._doc.items.reduce((acc:number, item: cartItem) => acc + item.quantity, 0) ,
        subtotal: cart._doc.items.reduce((acc:number, item: cartItem) => acc + item.quantity * item.product.price , 0)
    }

}

export async function createCart(): Promise<shoppingCart>{
    connectToDb()

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    let newCart;

    if (userId) {
        newCart = await Cart.create({
        items: [],
        userId: userId
    });

    } else {
        newCart = await Cart.create({
            items: []
        })
        //needs encryption 
        cookies().set("localCartId", newCart.id)
    }

    return {
        ...newCart._doc,
        size:0,
        subtotal:0
    }
}

export async function mergeAnonymousIntoUserCart(userId: string){
    const localCartId = cookies().get("localCartId")?.value

    const localCart = localCartId?
        await Cart.findById(localCartId).populate("items")
        : null
    if (!localCart) return 
    
    const userCart = await Cart.findOne({ "userId": `${userId}` }).populate("items")

    await Cart.startSession().then(async (session) => {
        session.startTransaction();

        try {
            if (userCart) {
                const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

                await CartItem.deleteMany({ cart: userCart._id });
                if(localCart) await CartItem.deleteMany({ cart: localCart._id });

                mergedCartItems.forEach( async (item) => {
                    const newCartItem = await CartItem.create({
                        cart: userCart._id,
                        product: item.product,
                        quantity: item.quantity,
                    }); 

                    await Cart.updateOne(
                        { _id: userCart._id },
                        { $push: { items: newCartItem } }
                      );
                })
                
            } else {
                await Cart.create({
                    userId,
                    items: localCart.items,
                });
            }

            await Cart.findByIdAndDelete(localCart._id);
            session.commitTransaction();
        } catch (error) {
            session.abortTransaction();
            console.error('Transaction failed:', error);
        }
    })    
}


function mergeCartItems(userCartItems: cartItem[], localCartItems: cartItem[]) {
    const mergedItems = [...userCartItems];
  
    localCartItems.forEach((localItem) => {
        const existingItem = mergedItems.find((item) => item.product._id.equals(localItem.product._id));
        console.log("Existing item: ",existingItem)
    
        if (existingItem) {
            existingItem.quantity += localItem.quantity;
        } else {
            mergedItems.push(localItem);
        }
        });
    return mergedItems;
}
