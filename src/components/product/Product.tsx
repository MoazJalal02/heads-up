'use client'

import React from 'react'
import Button from '../Button'
import styles from "./product.module.css"
import Image from "next/image"
import Link from 'next/link'

interface ProductProps {
    id: number
    brand: string
    name: string
    image: string
    price: number
}

export default function Product({ id, brand, name, price, image }: ProductProps) {
  return (
    <div className={styles.porduct_container}>
        <div className={styles.imageContainer}>
          <Image className={styles.product_image} src={(image)} alt="" width={500} height={500}></Image>
        </div>
        <Link href={`/${id}`} className={styles.product_infos}>
          <h5>{brand}</h5>
          <p>{name}</p>
          <p className={styles.price}>${price}</p>
        </Link>
        <Button />
    </div>
  )
}
