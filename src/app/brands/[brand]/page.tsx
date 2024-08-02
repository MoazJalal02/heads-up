import React from 'react'
import styles from './brand.module.css'
import Products from '@/components/products/Products';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

const getData = async () => {
    noStore()
    const apiUrl = process.env.API_URL
    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function page({ params }: { params: { brand: string } }) {
    const { brand } = params
    const brandName = capitalizeFirstLetter(brand)
    const products = await getData()

    console.log("Brand name => ", brandName)
    return(
        <main className={styles.container}>
            <p><Link href='/'>Home/</Link> <Link href='/brands'>Brands/</Link> <Link href={`/brands/${brand}`}>{brandName}</Link></p>
            <div className={styles.brandProducts}>
                <h2>{brandName}</h2>
                {<Products products = {products} brand={brandName} layout='grid'/>}
            </div>
        </main>
    )
}