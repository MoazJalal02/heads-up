"use client"

import styles from './quantityButton.module.css'
import { Saira_Condensed } from 'next/font/google'
import { useTransition } from 'react'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

type QuantityButtonProps = {
    id:string 
    quantity:number
    increment: (id: string) => Promise<void>
    decrement:(id: string) => Promise<void>
}

export default function QuantityButton({ id, quantity, increment, decrement }:QuantityButtonProps) {
    const [ isPending, startTransition ] = useTransition()

    return (
        <div className={styles.amountBtnContainer}>
            <button
                className={`${quantity=== 1 && styles.disabled}`} 
                disabled={(quantity === 1)}
                onClick={async () => startTransition( async () => await decrement(id) )}
            ><h5>-</h5></button>
            <h5 className={sairaCondensed.className}>{quantity}</h5>
            <button 
                onClick={async () => startTransition( async () => await increment(id) )}
            ><h5>+</h5></button>
        </div>
        )
}
