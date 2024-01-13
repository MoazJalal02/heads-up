'use client'


import React from 'react'
import Button from '../Button'
import styles from "./product.module.css"
import Image from "next/image"
import Link from 'next/link'
import { Sansita } from 'next/font/google'


const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})

interface ProductProps {
    id: string
    brand: string
    name: string
    image: string
    price: number
    showButton: boolean
}

export default function Product({ id, brand, name, price, image, showButton }: ProductProps) {
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
        {showButton && <Button />}
    </div>
  )
}
