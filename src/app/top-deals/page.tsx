import React from 'react'
import styles from './deals.module.css'
import Link from 'next/link'
import Products from '@/components/products/Products'
import { unstable_noStore as noStore} from 'next/cache'

const getData = async () => {
    noStore()
    const apiUrl = process.env.API_URL
    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
  }

export default async function page() {
    const products = await getData()
    return (
        <main className={styles.container}>
            <p><Link href='/'>Home/</Link> <Link href='/top-deals'>Top Deals</Link></p>
            <h1>TOP DEALS</h1>
            <>
                {<Products products = {products} isDiscount={true} layout='grid'/>}
            </>
        </main>
    )
}
