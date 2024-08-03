'use client'

import React from 'react'
import Button from '../addToCartBtn/Button'
import styles from "./product.module.css"
import Image from "next/image"
import Link from 'next/link'
import { objectId } from '@/lib/types'

interface ProductProps {
    id: objectId
    brand: string
    name: string
    image: string
    price: number
    showButton: boolean
    addToCart?: (id:objectId) => Promise<void>
    discount : number
}

export default function Product({ id, brand, name, price, image, showButton, discount, addToCart }: ProductProps) {
  return (
    <div className={styles.porductContainer}>
        <div className={styles.imageContainer}>
          <Image 
            className={styles.productImage} 
            src={(image)} 
            alt="" 
            sizes="100vw"
            width={736}
            height={736}
            style={{
              width: '100%',
              height: 'auto',
            }}
          ></Image>
        </div>
        <Link href={`/products/${id}`} className={styles.productInfos}>
          <h3 className={styles.productBrand}>{brand}</h3>
          <p className={styles.productName}>{name}</p>
          {discount != 0.00?  
            <div className={styles.priceContainer}>
              <p className={`${styles.price} ${styles.prevPrice}`}>${price}</p>
              <p className={`${styles.price} ${styles.newPrice}`}>${Math.floor(price - (price*discount))}</p>
            </div>
            : 
            <p className={styles.price}>${price}</p>
          }
        </Link>
        { showButton && 
          <div className={styles.buttonContainer}>
            {<Button id={id} addToCart={addToCart}/>}
          </div>
        }
    </div>
  )
}
