import React from 'react'
import styles from './single-product.module.css'
import Image from 'next/image'
import { Saira_Condensed } from 'next/font/google'
import { Sansita } from 'next/font/google'
import { unstable_noStore as noStore } from 'next/cache';
import ProductSuggestion from '@/components/productsSuggestion/ProductSuggestion'
import { addToCart } from '@/components/addToCartBtn/actions'
import { objectId } from '@/lib/types'
import QuantAddBtn from '@/components/addToCartBtn/quantAddBtn'

const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

const getProductData = async (id:objectId) => {
    noStore()
    const res = await fetch(`http://localhost:3000/api/products/${id}`);
  
    if (!res.ok) {
      console.log('error');
    }
  
    return res.json();
};

const getProductsData = async () => {
    const apiUrl = process.env.API_URL

    const res = await fetch(`${apiUrl}/api/products`)
    if(!res.ok){
      throw new Error("Something went wrong!")
    }
  
    return res.json()
}

export default async function page({ params }: { params: { id: objectId } }) {
    const { id } = params
    const product = await getProductData(id)
    const products = await getProductsData()

    return (
        <main className={sairaCondensed.className}>
            <div className={styles.imageContainer}>
                <Image 
                    className={styles.productImage} 
                    src={product.image} 
                    alt={product.name} 
                    sizes="100vw"
                    width={736}
                    height={736}
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                ></Image>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.infoContainer}>
                    <h3 className={styles.productBrand}>{product.brand}</h3>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <h5 className={sansita.className}>{product.description}</h5>
                    <h3>$15</h3>
                </div>
                {<QuantAddBtn id={id} addToCart={addToCart}/>}
                <section className={styles.suggestContainer}>
                    <h3>You might Like</h3>
                    <div className={styles.productsContainer}>
                        {/* <Image src='/assets/leftArrow.svg' width={20} height={20} alt=''/> */}
                        {<ProductSuggestion id={id} products={products}/>}
                        {/* <Image src='/assets/rightArrow.svg' width={20} height={20} alt=''/> */}
                    </div>
                </section>
            </div>
        </main>
    )
}
