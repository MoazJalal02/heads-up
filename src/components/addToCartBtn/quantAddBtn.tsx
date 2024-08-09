"use client"

import { objectId } from '@/lib/types'
import styles from './quantAddBtn.module.css'
import { useState, useTransition } from 'react'

type buttonProps = {
    id:objectId
    quantity?: number
    addToCart?: ((id:objectId, quantity:number) => Promise<void>) | undefined
  }

export default function QuantAddBtn({ id, addToCart }: buttonProps) {
    const [quantity, setQuantity] = useState<number>(1)
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState(false)
    const [showMessage, setShowMessage] = useState(false);

    const handleSuccess = () => {
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };

    return (
        <div className={styles.buttonsContainer}>
            <div className={styles.amountBtnContainer}>
                <button className="amount--btn" disabled={quantity < 2} onClick={() => setQuantity(prevQuant => prevQuant - 1)}><h2>-</h2></button>
                <h2 >{quantity}</h2>
                <button className="amount--btn" onClick={() => setQuantity(prevQuant => prevQuant + 1)}><h2>+</h2></button>
            </div>
            <div className={styles.addBtnContainer}>
                <button className={styles.addtBtn} onClick={() => startTransition(
                    async () => {
                        setSuccess(false)
                        if (addToCart) await addToCart(id, quantity)
                        setSuccess(true)
                        handleSuccess()
                    }
                )}>
                    {isPending ?
                        <div className={styles.loader}><div className={styles.spinner}></div></div>
                        : <h2>ADD TO CART</h2>
                    }
                </button>
                {
                    (!isPending) &&
                    <p className={`${styles.successMessage} ${showMessage ? `${styles.visible} ${success? styles.green: styles.red}` : styles.hidden}`}>{success ? 'Product added Successfully' : 'Failed to add product'}</p>
                }
            </div>
        </div>
    )
}