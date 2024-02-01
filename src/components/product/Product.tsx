'use client'


import React from 'react'
import Button from '../addToCartBtn/Button'
import styles from "./product.module.css"
import Image from "next/image"
import Link from 'next/link'
import { Sansita } from 'next/font/google'
import { objectId } from '@/lib/types'


const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})

interface ProductProps {
    id: objectId
    brand: string
    name: string
    image: string
    price: number
    showButton: boolean
    addToCart?: (id:objectId) => Promise<void>
}

export default function Product({ id, brand, name, price, image, showButton, addToCart }: ProductProps) {
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
          <h5 className={styles.productBrand}>{brand}</h5>
          <p className={styles.productName}>{name}</p>
          <p className={styles.price}>${price}</p>
        </Link>
        { showButton && 
          <div className={styles.buttonContainer}>
            {<Button id={id} addToCart={addToCart}/>}
          </div>
        }
    </div>
  )
}
