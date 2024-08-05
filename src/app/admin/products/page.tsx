import { unstable_noStore as noStore } from "next/cache"
import styles from './products.module.css'
import AdminProduct from "./components/AdminProduct"
import { ProductType, objectId } from "@/lib/types"

export const metadata = {
    title: "Heads Up Admin Center Products",
    description: "Admin Center Products description"
}

const apiUrl = process.env.API_URL

const getData = async () => {
    noStore()
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' })
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

export default async function page() {
    const products = await getData()

    return (
        <div className={styles.container}>
            <ul className={styles.productsContainer}>
                {   products && 
                    products.map((prod: ProductType,id:number)=>{
                        return(
                            <li key= {id}>
                                <AdminProduct 
                                    id= {prod._id}
                                    brand= {prod.brand} 
                                    name= {prod.name}
                                    image = {prod.image}
                                    discount = {prod.discount}
                                    price= {prod.price}
                                    apiUrl={apiUrl}
                                />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
