import mongoose from "mongoose"

export type ProductType = {
    _id: objectId
    brand: string
    name: string
    description: string
    price: number
    image: string
  }

export type cartItem = {
    _id: objectId
    product: ProductType
    quantity: number
    cart: mongoose.Types.ObjectId
} 

export type shoppingCart = {
    _id: objectId
    items: cartItem[]
    size: number
    subtotal: number
    save: (() => {})
}

export type objectId = mongoose.Types.ObjectId