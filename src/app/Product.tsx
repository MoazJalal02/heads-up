'use client'

import React from 'react'
import Button from './components/Button'
import styles from "./styles/product.module.css"
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
        <Link href={`/${id}`}>
            <Image className={styles.product_image} src={(image)} alt="" width={500} height={500}></Image>
            <div className={styles.product_infos}>
            <h5>{brand}</h5>
            <p>{name}</p>
            <p className={styles.price}>${price}</p>
            </div>
        </Link>
        <Button />
    </div>
  )
}
