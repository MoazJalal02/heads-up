import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/dbConnect"
import { Product } from "@/lib/models/productModel"
import type { NextApiRequest } from 'next'
 
export const GET = async (request: NextApiRequest,{ params }: { params: { id: string } }) => {

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
