import React from 'react'
import styles from './deals.module.css'
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

const getDiscounted =  (products: ProductType[]) => {
    const discounted = products.filter((product) => {
        return product.discount != 0
    })

    return discounted.sort((a, b) => new Date(b.discount).getTime() - new Date(a.discount).getTime());
}

export default async function page() {
    const products = await getData()
    const discountedProducts = getDiscounted(products)
    return (
        <main className={styles.container}>
            <p className={styles.previousLink}><Link href='/'>Home/</Link> <Link href='/top-deals'>Top Deals</Link></p>
            <h1>TOP DEALS</h1>
            <>
                {<Products products = {discountedProducts} layout='grid'/>}
            </>
        </main>
    )
}
