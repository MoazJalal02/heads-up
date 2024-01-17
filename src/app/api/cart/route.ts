import { NextResponse,NextRequest } from "next/server"
import { connectToDb } from "@/lib/dbConnect"
import { Cart,CartItem } from "@/lib/models/CartModel"
 
export const GET = async () => {
    try{
        await connectToDb()
        const cart = await Cart.find()
        return NextResponse.json(cart)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to fetch product!")
    }
}
