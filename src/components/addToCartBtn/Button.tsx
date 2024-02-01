"use client"

import { useState, useTransition } from "react"
import styles from './button.module.css'
import { objectId } from "@/lib/types"

export type buttonProps = {
  id:objectId
  quantity?: number
  addToCart?: ((id:objectId, quantity:number) => Promise<void>) | undefined
}

export default function Button({id, quantity = 1, addToCart} : buttonProps,) {
  const [ isPending, startTransition ] = useTransition()
  const [success,setSuccess] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSuccess = () => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    };

  return (
    <>
      <button className={styles.addToCartBtn} onClick={() => startTransition(
        async () => {
          setSuccess(false)
          if(addToCart) await addToCart(id, quantity)
          setSuccess(true)
          handleSuccess()
        }
        )}>
        {isPending? 
          <div className={styles.loader}><div className={styles.spinner}></div></div>
          :<h3>ADD TO CART</h3>
        }
      </button>
        {(!isPending && success) && 
          <span className={`${styles.successMessage} ${showSuccessMessage? styles.visible: styles.hidden}`}>Added to cart!</span>
        }
    </>
  )
}
