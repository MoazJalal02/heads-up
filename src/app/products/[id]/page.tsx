import React from 'react'
import styles from './single-product.module.css'
import Image from 'next/image'
import { unstable_noStore as noStore } from 'next/cache';
import ProductSuggestion from '@/components/productsSuggestion/ProductSuggestion'
import { addToCart } from '@/components/addToCartBtn/actions'
import { objectId, ProductType } from '@/lib/types'
import QuantAddBtn from '@/components/addToCartBtn/quantAddBtn'


const getProductData = async (id: objectId) => {
  noStore()
  const apiUrl = process.env.API_URL
  const res = await fetch(`${apiUrl}/api/products/${id}`);

  if (!res.ok) {
    console.log('error');
  }

  return res.json();
};

const getProductsData = async () => {
  const apiUrl = process.env.API_URL

  const res = await fetch(`${apiUrl}/api/products`)
  if (!res.ok) {
    throw new Error("Something went wrong!")
  }

  return res.json()
}

export default async function page({ params }: { params: { id: objectId } }) {
  const { id } = params
  const product: ProductType = await getProductData(id)
  const products = await getProductsData()

  return (
    <main className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.nameContainer}>
          <h3 className={styles.productBrand}>{product.brand}</h3>
          <p className={styles.productName}>{product.name}</p>
        </div>
        <div className={styles.priceContainer}>
          {product.discount != 0.00 ?
            <>
              <p className={`${styles.price} ${styles.prevPrice}`}>${product.price}</p>
              <p className={`${styles.price} ${styles.newPrice}`}>${Math.floor(product.price - (product.price * product.discount))}</p>
            </>
            :
            <p className={styles.price}>${product.price}</p>
          }
        </div>
      </div>
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
      <p>{product.description}</p>
      {<QuantAddBtn id={id} addToCart={addToCart} />}
      <section className={styles.suggestContainer}>
        <h3>You might Like</h3>
        <div className={styles.productsContainer}>
          {/* <Image src='/assets/leftArrow.svg' width={20} height={20} alt=''/> */}
          {<ProductSuggestion id={id} products={products} />}
          {/* <Image src='/assets/rightArrow.svg' width={20} height={20} alt=''/> */}
        </div>
      </section>
    </main>
  )
}
