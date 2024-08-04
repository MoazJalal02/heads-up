import React from 'react'
import styles from './arrivals.module.css'
import Link from 'next/link'
import Products from '@/components/products/Products'
import { unstable_noStore as noStore} from 'next/cache'
import { ProductType } from '@/lib/types'

const getData = async () => {
    noStore()
    const apiUrl = process.env.API_URL
    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

const filterByDate = async (products : ProductType[]) => {
    const latestProducts = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return latestProducts.slice(0,4)
}

export default async function page() {
    const products: ProductType[] = await getData()
    const latestProducts = await filterByDate(products)
    return (
        <main className={styles.container}>
            <p className={styles.previousLink}><Link href='/'>Home/</Link> <Link href='/new-arrivals'>New Arrivals</Link></p>
            <h1>NEW ARRIVALS</h1>
            <>
                {<Products products = {latestProducts} layout='grid'/>}
            </>
        </main>
    )
}
