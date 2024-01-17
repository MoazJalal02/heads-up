import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/dbConnect"
import { Product } from "@/lib/models/productModel"
 
export const GET = async () => {
  try{
    await connectToDb()
    
    const products = await Product.find().maxTimeMS(30000)
    return NextResponse.json(products)
  }
  catch(err){
    console.log(err)
    throw new Error("Failed to fetch products!")
  }
}