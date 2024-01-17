"use server"

import { connectToDb } from '@/lib/dbConnect'
import { Cart } from '@/lib/models/CartModel'
import { cookies } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import type { cartItem, shoppingCart } from '@/lib/types'

export async function getCart(): Promise<shoppingCart | null > {
    connectToDb()
    noStore()
    
    const localCartId = cookies().get("localCartId")?.value
    const cart = localCartId?
        await Cart.findById(localCartId).populate({
            path: 'items',
            populate: { path: 'product' } // Populate the 'product' field in each 'CartItem'
          })
        : null
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

    const newCart = await Cart.create({
        items: []
    })
    //needs encryption 
    cookies().set("localCartId", newCart.id)
    
    return {
        ...newCart._doc,
        size:0,
        subtotal:0
    }
}
