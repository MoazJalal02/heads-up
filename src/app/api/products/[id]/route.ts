import { NextResponse,NextRequest } from "next/server"
import { connectToDb } from "@/lib/dbConnect"
import { Product } from "@/lib/models/productModel"
 
export const GET = async (_request: NextRequest,{ params }: { params: { id: string } }) => {
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
