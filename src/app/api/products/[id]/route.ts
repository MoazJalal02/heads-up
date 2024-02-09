import { NextResponse,NextRequest } from "next/server"
import { connectToDb } from "@/lib/dbConnect"
import { Product } from "@/lib/models/productModel"
import { objectId } from "@/lib/types"
import { revalidatePath } from "next/cache"

type paramsType = {
    params: { id: objectId }
}
 
export const GET = async (_request: NextRequest,{ params }: paramsType) => {
    try{
        await connectToDb()
        const { id } = params
        const product = await Product.findById(id)
        return NextResponse.json(product)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch product!")
    }
}

export const PUT = async (req:NextRequest, { params }: paramsType) => {
    try {
        await connectToDb()
        const { id } = params
        const data = await req.json()
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true})

        console.log('Product updated successfully')
        console.log('Updated Product: ',updatedProduct)
        return NextResponse.json(updatedProduct)
    } catch(err){
        console.log(err)
        return NextResponse.json(err)
    }
} 

export const DELETE = async (req:NextRequest, { params }: paramsType) => {
    try {
        await connectToDb()
        const { id } = params

        await Product.findByIdAndDelete(id)

        return NextResponse.json("Product Deleted")
    } catch(err){
        console.log(err)

        return NextResponse.json(err)
    }
} 

// export async function createProduct(formData: FormData) {
//     const brand = formData.get('brand')
//     const name = formData.get('name')
//     const image = formData.get('image')
//     const price = formData.get('price')
//     const description = formData.get('description')
//     const product = {
//         brand,
//         name,
//         image,
//         price,
//         description,
//     }
//     try {
//         Product.create(product)
//         revalidatePath('/')
//         console.log('Product added successfuly')
//     } catch(e){
//         console.log('Failed to create product')
//     }
//     console.log(formData)
// }

// export async function deleteProduct(id:objectId){
//     try {
//             // Find the cart item to be deleted
//             const product = await Product.findById(id);
    
//             // If the cart item is found, remove it from the cart's items array
//             if (product) {
//                 await Product.deleteOne(product)
//             }
    
//             revalidatePath("/admin/products");
//         }
//     catch (err) {
//             console.log("Failed to delete product!");
//     }
// }