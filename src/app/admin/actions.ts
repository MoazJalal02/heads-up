'use server'
import { Product } from "@/lib/models/productModel"
import { objectId } from "@/lib/types"
import { revalidatePath } from "next/cache"

export async function createProduct(formData: FormData) {
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

export async function deleteProduct(id:objectId){
    try {
            // Find the cart item to be deleted
            const product = await Product.findById(id);
    
            // If the cart item is found, remove it from the cart's items array
            if (product) {
                await Product.deleteOne(product)
            }
    
            revalidatePath("/admin/products");
        }
    catch (err) {
            console.log("Failed to delete product!");
    }
}

// export async function editProduct(id:objectId){
//     try {
//         const product = await Product.findById(id)
//         Product.updateOne(
//             {'_id':id},
//             {}
//         )
//     }
// }