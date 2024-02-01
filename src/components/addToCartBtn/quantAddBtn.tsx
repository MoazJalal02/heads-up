"use client"

import styles from './quantAddBtn.module.css'
import Button, { buttonProps } from '@/components/addToCartBtn/Button'
import { Saira_Condensed } from 'next/font/google'
import { Sansita } from 'next/font/google'
import { useState } from 'react'

const sansita = Sansita({
  weight: ["400"],
  subsets: ["latin"],
})

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

export default function QuantAddBtn({ id, addToCart } : buttonProps) {
    const [ quantity, setQuantity ] = useState<number>(1)

    return (
        <div className={`${styles.buttonsContainer} ${sansita.className}`}>
            <div className={styles.amountBtnContainer}>
                <button className="amount--btn" disabled={quantity<2} onClick={() => setQuantity(prevQuant => prevQuant - 1)}><h3>-</h3></button>
                <h4 className={sairaCondensed.className}>{quantity}</h4>
                <button className="amount--btn" onClick={() => setQuantity(prevQuant => prevQuant + 1)}><h3>+</h3></button>
            </div>
            <div className={styles.buttonContainer}>
                <Button id={id} quantity={quantity} addToCart={addToCart} />
            </div>
        </div>
    )
}
