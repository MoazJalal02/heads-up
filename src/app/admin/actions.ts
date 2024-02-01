'use server'
import { Product } from "@/lib/models/productModel"
import { revalidatePath } from "next/cache"

export default async function createProduct(formData: FormData) {
    const brand = formData.get('brand')
    const name = formData.get('name')
    const image = formData.get('image')
    const price = formData.get('price')
    const description = formData.get('description')
    const product = {
        brand,
        name,
        image,
        price,
        description,
    }
    try {
        Product.create(product)
        revalidatePath('/')
        console.log('Product added successfuly')
    } catch(e){
        console.log('Failed to create product')
    }
    console.log(formData)
}