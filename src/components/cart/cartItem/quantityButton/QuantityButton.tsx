"use client"

import { objectId } from '@/lib/types'
import styles from './quantityButton.module.css'
import { Saira_Condensed } from 'next/font/google'
import { useTransition } from 'react'

const sairaCondensed = Saira_Condensed({
    weight: ["400","600","700"],
    subsets: ["latin"],
})

type QuantityButtonProps = {
    id: objectId 
    quantity:number
    increment: (id: objectId) => Promise<void>
    decrement:(id: objectId) => Promise<void>
}

export default function QuantityButton({ id, quantity, increment, decrement }:QuantityButtonProps) {
    const [ isPending, startTransition ] = useTransition()

    return (
        <div className={styles.amountBtnContainer}>
            <button
                className={`${quantity=== 1 && styles.disabled}`} 
                disabled={(quantity === 1)}
                onClick={async () => startTransition( async () => await decrement(id) )}
            ><p>-</p></button>
            <p className={sairaCondensed.className}>{quantity}</p>
            <button 
                onClick={async () => startTransition( async () => await increment(id) )}
            ><p>+</p></button>
        </div>
        )
}
