export type ProductType = {
    _id: string
    brand: string
    name: string
    description: string
    price: number
    image: string
  }

export type cartItem = {
    _id:string
    product: ProductType
    quantity: number
    cartId: string
} 

export type shoppingCart = {
    _id:string
    items: cartItem[]
    size: number
    subtotal: number
    save: (() => {})
}