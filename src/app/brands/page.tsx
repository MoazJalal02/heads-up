import React from 'react'
import styles from './brands.module.css'
import Link from 'next/link'
import Products from '@/components/products/Products'
import ProductsSlider from '@/components/ProductsSlider/ProductsSlider'
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
            <p><Link href='/'>Home/</Link> <Link href='/brands'>Brands</Link></p>
            <div className={styles.brandsContainer}>
                <h1>BRANDS</h1>
                <div className={styles.brandsList}>
                    <Link href='' className={styles.brandButton}>
                    <h3>VERVE</h3>
                    </Link>
                    <Link href='' className={styles.brandButton}>
                    <h3>GRILD</h3>
                    </Link>
                    <Link href='' className={styles.brandButton}>
                    <h3>BARS</h3>
                    </Link>
                </div>
            </div>
            <section className={styles.brandContainer}>
                <h2>VERVE</h2>
                <div className={styles.productsRow}>
                    {<ProductsSlider products = {products} brand='Verve'/>}
                </div>
            </section>

            <section className={styles.brandContainer}>
                <h2>BARS</h2>
                <>
                    {<ProductsSlider products = {products}  brand='Bars'/>}
                </>
            </section>

            <section className={styles.brandContainer}>
                <h2>GRILD</h2>
                <>
                    {<ProductsSlider products = {products} brand='Grild'/>}
                </>
            </section>        
        </main>
    )
}
