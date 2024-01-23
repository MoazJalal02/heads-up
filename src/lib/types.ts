import mongoose from "mongoose"

export type ProductType = {
    _id: mongoose.Types.ObjectId
    brand: string
    name: string
    description: string
    price: number
    image: string
  }

export type cartItem = {
    _id:mongoose.Types.ObjectId
    product: ProductType
    quantity: number
    cart: mongoose.Types.ObjectId
} 

export type shoppingCart = {
    _id: mongoose.Types.ObjectId
    items: cartItem[]
    size: number
    subtotal: number
    save: (() => {})
}