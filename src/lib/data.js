import { connectToDb } from "./dbConnect";
import { Product } from "./models/productModel";

export const getProducts = async () => {
    try {
        connectToDb()
        const products = await Product.find()
        return products
    }
    catch(err) {
        console.log(err)
        throw new Error("Failed to fetch the products.")
    }
}

export const getProduct = async (id) => {
    try {
        connectToDb()
        const product = await Product.find({id})
        return product
    }
    catch(err) {
        console.log(err)
        throw new Error("Failed to fetch the product.")
    }
}